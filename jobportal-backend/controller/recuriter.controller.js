
import userModel from "../models/user.model.js";

export const jobPost=async(req,res,io)=>{


    try{

        const updateData=req.body;
        const userId=req.user._id;

        updateData.author=userId;

        const user=await userModel.findById(userId);

        if(!user){
              return res.status(404).json({error:"user not auhorized"})
        } 

           user.recuriter.push(updateData);
           await user.save();
           res.status(200).json(user)

        //    const getjobs=await userModel.find({PersonType:'recruiter'}).select('recuriter');
        //    const skills=user.jobseeker.skills;

        
           

        //    const recommendedJobs=[];

        //    if(getjobs && getjobs.length>0){
        //           getjobs.forEach((item)=>{

        //            item.recuriter.forEach((jobs)=>{
        //                if(!jobs.appliedNumbers.includes(req.user._id))
        //                {
        //                    const checkSkill=skills.some(skill=>jobs.skills.includes(skill)); 
        //                    if(checkSkill)
        //                      recommendedJobs.push(jobs)
        //                }
                       
        //            })
                      
        //           })
        //    }
        //  console.log(recommendedJobs.length)
        //    const intervalId=setInterval(()=>{
        //       if(recommendedJobs.length>0){
        //            io.emit('newJobPosted',recommendedJobs)
        //       }
        //    },5000)
        
       
        //    res.status(200).json(user);
        //     io.on('disconnect',()=>{
        //           clearInterval(intervalId)
        //     })
              

    }catch(err){

        res.status(500).json({error:err.message});
          
    }

}




export const getAllJobs=async(req,res)=>{
  let c=0;
    const page=parseInt(req.query.page) ;
    const limit=parseInt(req.query.limit) ;

    const skip=(page-1)*limit;
    console.log(page,limit,skip)

    try{
          let jobs=await userModel.find({PersonType:"recruiter"})
         
          .populate('recuriter.author','name email').sort({'recuriter.createdAt':-1})

          console.log(jobs)

        

          const user=await userModel.findById(req.user._id).select('jobseeker')

          const allRecruiterJobs = jobs[0].recuriter;


          const paginatedJobs = allRecruiterJobs.reverse().slice(skip, skip + limit);
          
          if(jobs.length === 0){
              return res.status(404).json({message:"jobs not posted"})
          }
            for(let i of jobs)
                c=c+i.recuriter.length;
        

          res.status(200).json({jobs:paginatedJobs,totalJobs:c,user:user});
    }catch(err){
        res.status(500).json({error:err.message})

    }
        
}



export const getRecruiterJobs=async(req,res)=>{
       try{
              const userId=req.user._id;

            

           
              const user=await userModel.findById(userId).select('recuriter')

              res.status(200).json(user);

       }catch(err){

        res.status(400).json({error:err.message})
          
       }
}


export const getApplicants=async(req,res)=>{
      try{
            const jobId=req.params.jobId;

            const user = await userModel.findOne(
                { _id: req.user._id, 'recuriter._id': jobId }, 
                { 'recuriter.$': 1 } //it is used to return only one field
            ).populate({
                path: 'recuriter.appliedNumbers', 
                select: 'jobseeker'
            })
             console.log(user);

            res.status(200).json(user.recuriter);

      }catch(err){
           res.status(500).json({error:err.message})
      }
}


export const  updateStatus=async(req,res)=>{
 
    const {userId,jobId,status}=req.body

       try{
             const user=await userModel.findById(userId).select('jobseeker');

             if(!user)
                res.status(404).json({error:"user not found"})

            
             const existingUser=user.jobseeker.applicationStatus.find(jobs=>jobs._id.toString() === jobId)

             if(existingUser)
                  existingUser.status=status
             else
                  user.jobseeker?.applicationStatus.push({jobId,status})
            

             await user.save();             
             res.status(200).json(user);

       }catch(err){

        res.status(500).json({error:err.message})
          
       }
}





