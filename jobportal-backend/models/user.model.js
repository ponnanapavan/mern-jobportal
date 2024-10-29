import mongoose from 'mongoose';





const userSchema=new mongoose.Schema({
       username:{type:String,unique:true},
       name:{type:String},
       email:{type:String,unique:true},
       password:{type:String},
       PersonType:{type:String,enum:["jobseeker","recruiter"]},
       createdAt:{type:Date,default:Date.now},
       updatedAt:{type:Date,default:Date.now},
       profilePicture:{type:String},
       jobseeker:{
            name:{type:String},
            email:{type:String},
            phno:{type:String},
            userBio:{type:String},
            skills:[{type:String}],
            location:{type:String},
            workMode:{type:String,enum:["Hybrid","OnSite","Remote"]},
            SalaryExceptation:{type:Number},
            applicationStatus:[{
                    jobId:{type:String},
                    status:{type:String,enum:["Shortlisted","Rejected","Reviewing"],default:'pending'}
            }],
            education:[
                    {
                          CollegeName:{type:String},
                          collegeType:{type:String},
                          degree:{type:String},
                          branch:{type:String},
                          startDate:{type:Date},
                          endDate:{type:Date}
                    }
            ],
               
            resume:{type:String},
            appliedJobs:[{type:mongoose.Schema.Types.ObjectId,ref:'User.jobseeker'}],
            savedJobs:[{type:mongoose.Schema.Types.ObjectId,ref:'User',default:[]}],
            availablity:{type:String,  enum: ["immediately", "within 1 month", "within 3 months"]},
            
            
            experience:[
                  {
                        experienceType:{type:String,enum:["Internship","PartTime","FullTime"]},
                      companyName:{type:String},
                      JobTitle:{type:String},
                      YearsOfExperience:{type:String},
                      startDate:{type:Date},
                      endDate:{type:Date},
                      description:{type:String},
                      JobLocation:{type:String}
                      
                  }
            ],

            projects:[
                  {
                      projectName:{type:String},
                      projectTechStack:{type:String},
                      startDate:{type:String},
                      endDate:{type:String},
                      projectDescription:{type:String},
                      projectLink:{type:String}
                  }
            ],
            

            
       },

       recuriter:[
             {
                  companyName:{type:String},
                  companyLocation:{type:String},
                  jobDescription:{type:String},
                  JobTitle:{type:String},
                  experience:{type:Number},
                  skills:[{type:String}],
                  jobType:{type:String,enum:["FullTime","PartTime","Internship"]},
                 availablity:{type:String, enum:["immediately","within 1 month","within 3 months"]},
                 author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
                 appliedNumbers:[{type:mongoose.Schema.Types.ObjectId, ref:'User',default:[]}],
                 createdAt:{type:Date,default:Date.now},
                 companySize:{type:String},
                 companyType:{type:String, enum:["startup","mnc","productbased"]},
                 workMode:{type:String,enum:["Hybrid","OnSite","Remote"]},
                 salary:{type:Number}
              

             }
       ]
})

const  userModel=mongoose.model('User',userSchema)
 
export default userModel;

