// Import necessary modules
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRouther } from './routes/user.route.js';
import connectDb from './database/db.js';
import { userProfileRouter } from './routes/userprofile.route.js';
import multer from 'multer';
import { recuriterRouter } from './routes/recuriter.route.js';
import cloudinary from './lib/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import userModel from './models/user.model.js';
import { protectRoute } from './middleware/protectRoute.js';
import http from 'http'; 
import { Server } from 'socket.io'; 


// Initialize Express app
const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "*", 
    
        credentials: true
    }
});

 
io.on('connection', (socket) => {
    
  

    let intervalId;  

    socket.on("userId", async (userId) => { 
        try {
            const user = await userModel.findById(userId); 
            const recommendedJobs = [];
            
            if (user) {
                const sendJobRecommendations = async () => {
                    const getJobs = await userModel.find({ PersonType: 'recruiter' }).select('recuriter');
                    const skills = user.jobseeker.skills;

                    if (getJobs && getJobs.length > 0) {
                        getJobs.forEach((item) => {
                            item.recuriter.forEach((job) => {
                                if (!job.appliedNumbers.includes(userId)) {
                                    const checkSkill = skills.some((skill) => job.skills.includes(skill));
                                    if (checkSkill) {
                                        recommendedJobs.push(job);
                                    }
                                }
                            });
                        });
                    }

                    socket.emit('jobRecommendations', recommendedJobs); // Send initial job recommendations to client
                };

                await sendJobRecommendations();

               
                intervalId = setInterval(() => {
                    socket.emit('jobRecommendations', recommendedJobs);
                }, 20000);

             
                socket.on('disconnect', () => {
                    console.log('User disconnected:', socket.id);
                    clearInterval(intervalId);  
                });
            } else {
                console.error('User not found.');
            }
        } catch (err) {
            console.error('Error fetching job recommendations:', err.message);
        }
    });
});



app.io = io;


app.use(cors('*'))
app.use(express.json());
app.use(cookieParser());
dotenv.config();


const storage = multer.memoryStorage();
const multerStorage = multer({ storage: storage });


app.use('/api/v1/auth', authRouther);


app.use('/api/v1/user', userProfileRouter);


app.use('/api/v1/recuriter', recuriterRouter);


app.put('/api/v1/uploadResume', protectRoute, multerStorage.single('resume'), async (req, res) => {
    try {
        const file = req.file;
   

        if (!file)
            return res.status(400).json({ error: 'No file uploaded' });

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                resource_type: 'raw',
                format: 'pdf',
            }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });

            stream.end(file.buffer); // Upload the resume file
        });

        const updatedUser = await userModel.findByIdAndUpdate(
             req.user._id,                       // User's ID
           { $set: { 'jobseeker.resume': result.secure_url } }, // Update the resume field
            { new: true, runValidators: true }  // Return the updated document and run schema validators
          );
     
      
        res.status(200).json({
            message: "Resume uploaded successfully",
            resume_url: result.secure_url
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});





server.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectDb(); 
});
