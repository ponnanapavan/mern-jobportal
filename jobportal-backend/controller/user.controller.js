
import userModel from "../models/user.model.js";

import mongoose from "mongoose";



export const storeUserData=async(req,res)=>{

    try{

        const userId=req.user._id;

        const updateData=req.body;

        const user=await userModel.findById(userId);

        if(!user){
              return res.status(404).json({error:"user not found"});
        }

        user.jobseeker={...user.jobseeker,...updateData};

       await user.save();



        res.status(200).json(user);

    }catch(err){

        res.status(500).json({error:err.message});
          
    }
       
}






export const getUserProfile=async(req,res)=>{
       try{

        const userId=req.user._id;

        const getUser=await userModel.findById(userId).select(' jobseeker');

        if(!getUser){
              return res.status(404).json({error:'user not found'})
        }
            res.status(200).json(getUser);

       }catch(err){
           res.status(500).josn({error:err.message})
       }
}






export const saveJob=async(req,res)=>{
       try{
             const {jobId}=req.params;
             const userId=req.user._id;

             console.log(jobId)

             const user=await userModel.findById(userId);

             if(!user)
                return res.status(404).json({error:"user not found"})

             console.log(user)

             user.jobseeker.savedJobs.push(jobId);

        

             await user.save();

             res.status(200).json({success:true});

       }catch(err){
           res.status(500).json({error:err.message,success:false})
       }
}




export const getJob=async(req,res)=>{
    const {jobId}=req.params;
  
       try{
    

        // const jobIdObject =new  mongoose.Types.ObjectId(jobId);

        const getJob = await userModel.findOne({ 'recuriter._id': jobId });
        if (getJob) {
           var foundRecruiter = getJob.recuriter.find(rec => rec._id.toString() === jobId);
           
          } else {
            console.log('Job not found');
          }
               res.status(200).json(foundRecruiter)    
       }catch(err){

        res.status(500).json({error:err.message})
          
       }
    }


     export const applyJob =async(req,res)=>{
            try{

                  const {jobId}=req.params;
                  const userId=req.user._id;

                  const user=await userModel.findById(userId);

                  user.jobseeker.appliedJobs.push(jobId);

                  await user.save();

                  const recuriterJob=await userModel.findOne({'recuriter._id':jobId});
                  if (recuriterJob) {
                    var foundRecruiter = recuriterJob.recuriter.find(rec => rec._id.toString() === jobId);

                    if(foundRecruiter.appliedNumbers.includes(userId))
                          return res.status(400).json({error:'you already applied job '})
                    else
                    foundRecruiter.appliedNumbers.push(userId);

                   }
                        await recuriterJob.save();

                        res.status(200).json({message:'applied succesfully',success:true})
                       


            }catch(err){

                res.status(500).json({error:err.message,success:false});
                  
            }
       }



       export const getSameJobSuggestions = async (req, res) => {
        try {
            const { companyName, companyLocation, JobTitle } = req.body;
            
            const userId = req.user._id;

            const {jobId}=req.params 

            const user=await userModel.findById(userId).select('jobseeker')
    
            const suggestionsJobs = [];
            const getSameJobs = await userModel.find({ PersonType: "recruiter" }).select("recuriter");//get all jobs which posted by recrutier
    
            getSameJobs.forEach(items => {
                if (items.recuriter && items.recuriter.length>0) {
                    items.recuriter.forEach(jobs => {
                        if (!jobs.appliedNumbers.includes(userId) && jobs._id.toString() !== jobId) { //curent job will not show in suggestions
                           
                            if (jobs['companyName'].toLowerCase() === companyName.toLowerCase() || 
                                jobs['companyLocation'].toLowerCase() === companyLocation.toLowerCase() || 
                                jobs['JobTitle'].toLowerCase() === JobTitle.toLowerCase()) {
                                suggestionsJobs.push(jobs);
                            }
                        }
                    });
                }else{
                      return res.status(404).json({error:'job not founded'})
                }
            });
    
            
            res.status(200).json({
    user: user, 
    suggestionsJobs: suggestionsJobs.slice(0, 3) // Assigning a key to the sliced array
});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };




    export const getSavedJobs=async(req,res)=>{
          try{

            
                const getsavedjobs=await userModel.findById(req.user._id).select('jobseeker')

                 const getAllJobs=await userModel.find({PersonType:'recruiter'}).select('recuriter')
                const savedJobs=getsavedjobs.jobseeker.savedJobs;

                const savedJobsArray=[]

               getAllJobs.forEach(items=>{
                    items.recuriter.forEach(jobs=>{
                          if(savedJobs.includes(jobs._id.toString()))
                            savedJobsArray.push(jobs)
                    })
               })
                
            
                res.status(200).json(savedJobsArray);

}catch(err){
            res.status(500).json({error:err.message})
              
          }
    }
    



export const getAppliedJobs=async(req,res)=>{
       try{
        const getuser=await userModel.findById(req.user._id).select('jobseeker')

        const getAllJobs=await userModel.find({PersonType:'recruiter'}).select('recuriter')

        const jobsArray=[]
        

        if(getAllJobs && getAllJobs.length>0){
            getAllJobs.forEach((item)=>{
                   item.recuriter.forEach((jobs)=>{
                       if(getuser.jobseeker.appliedJobs && getuser.jobseeker.appliedJobs.length>0 && getuser.jobseeker?.appliedJobs.includes(jobs._id.toString()))
                        jobsArray.push(jobs);
                   })
            })
        }else{
              return res.status(400).json({error:'you not applied any jobs'})
        }

               res.status(200).json({jobsArray,user:getuser.jobseeker.applicationStatus})
       }catch(err){
          res.status(500).json({error:err.message})
       }
}

export const getRecommendedJobs=async(req,res)=>{
       try{
              const getUser=await userModel.findById(req.user._id).select('jobseeker');

              if(!getUser)
                   return res.status(404).json({error:"user not found"})
            const getjobs=await userModel.find({PersonType:'recruiter'}).select('recuriter');
            const skills=getUser.jobseeker.skills;
            

            const recommendedJobs=[];

            if(getjobs && getjobs.length>0){
                   getjobs.forEach((item)=>{

                    item.recuriter.forEach((jobs)=>{
                        if(!jobs.appliedNumbers.includes(req.user._id))
                        {
                            const checkSkill=skills.some(skill=>jobs.skills.includes(skill)); 
                            if(checkSkill)
                              recommendedJobs.push(jobs)
                        }
                        
                    })
                       
                   })
            }

            res.status(200).json({recommendedJobs});

       }catch(err){
        res.status(500).json({error:err.message})
          
       }
}
    

export const filterJobs=async(req,res)=>{
       try{
              const jobsArray=[];
              const {JobTitle,companyLocation,experience}=req.body;

              

              const getJobs=await userModel.find({PersonType:'recruiter'}).select('recuriter');

              if(!getJobs){
                  return res.status(404).json({error:'jobs not their'})
              }

              if (getJobs && getJobs.length > 0) {
                getJobs.forEach((item) => {
                    if (item.recuriter && item.recuriter.length > 0) {
                        item.recuriter.forEach((job) => {
                           
                            const isExperienceMatch = experience ? job.experience === parseInt(experience ): true;
                            const isJobTitleMatch=  JobTitle ? job.JobTitle.toLowerCase() === JobTitle.toLowerCase() : true
                          
                            const iscompanyLocation=companyLocation ? job.companyLocation.toLowerCase() === companyLocation.toLowerCase() : true
                               
                        
                            if ( isExperienceMatch && isJobTitleMatch && iscompanyLocation ) {
                                jobsArray.push(job);
                            }
                        });
                    }
                });
            }
            
              
              res.status(200).json(jobsArray);

       }catch(err){

        res.status(500).json({error:err.message})
          
       }
}


export async function getCountOfStatus(req,res){

    const statusState={
        Reviewing:0,
        Rejected:0,
        Shortlisted:0
    }
    
    try{
        const user=await userModel.findById(req.user._id).select('jobseeker');

       if(!user){
           return res.status(404).json({error:"user not found"})
       }

        const applicationStatus=user.jobseeker.applicationStatus

        if(applicationStatus && applicationStatus.length>0){
              applicationStatus.forEach((item)=>statusState[item.status]++)
        }

        res.status(200).json(statusState)     



    }catch(err){

        res.status(500).json({error:err.message})

        
    }


}