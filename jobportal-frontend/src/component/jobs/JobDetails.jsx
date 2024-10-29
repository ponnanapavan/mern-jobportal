import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'; // Import the icon you want to use
import { Button } from '@/components/ui/button';
import SameJobSuggestions from './SameJobSuggestions';

const JobDetails = () => {
    const { jobId } = useParams();
    const [jobDetails, setJobDetails] = useState(null);
   const userData=JSON.parse(localStorage.getItem('userData'))
   const navigate=useNavigate();
    useEffect(() => {
        const getJob = async () => {
            try {
                const apiResponse = await fetch(`/api/v1/user/getjob/${jobId}`, {
                    method: 'GET',
                });

               
                const response = await apiResponse.json();
               setJobDetails(response);
                
            } catch (err) {
                console.log(err.message);
            }
        };

        getJob();
    }, [jobId]);

    async function applyJob(){
          try{

            const apiResponse=await fetch(`/api/v1/user/applyjob/${jobId}`,{
                  method:"POST",
                  
            })
               const response=await apiResponse.json();

               if(response.success){


                navigate(0);
                }

      

          }catch(err){

            console.log(err.message)
              
          }
    }


     


    return (
      <>
            <div className="max-w-8xl mx-auto p-7 bg-white shadow-lg rounded-lg">
            {jobDetails ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">{jobDetails.companyName}</h1>
                    <h2 className="text-2xl font-semibold mb-2">{jobDetails.JobTitle}</h2>
                    <p className="text-gray-700 mb-4"><strong>Description:</strong> {jobDetails.jobDescription}</p>
                    <p className="text-gray-700 mb-4"><strong>Location:</strong> {jobDetails.companyLocation}</p>
                    <p className="text-gray-700 mb-4"><strong>Experience Required:</strong> {jobDetails.experience} years</p>
                    <p className="text-gray-700 mb-4"><strong>Skills:</strong> {jobDetails.skills.join(', ')}</p>
                    <p className="text-gray-700 mb-4"><strong>Job Type:</strong> {jobDetails.jobType}</p>
                    <p className="text-gray-700 mb-4"><strong>Availability:</strong> {jobDetails.availablity}</p>
                    <p className="text-gray-700 mb-4"><strong>Applied Numbers:</strong> {jobDetails.appliedNumbers.length}</p>
                    
                    {jobDetails.appliedNumbers.length>0 ? <div>
                          {
                              jobDetails.appliedNumbers.includes(userData?.userid)?<Button>Applied</Button>
                              :<Button onClick={()=>applyJob()}>Apply</Button>
                          }
                         </div> :<Button onClick={()=>applyJob()}>Apply</Button>}
                </>
            ) : (
                <p className="text-gray-700">Loading job details...</p>
            )}
        </div>
         {jobDetails &&  <SameJobSuggestions companyName={jobDetails.companyName}  companyLocation={jobDetails.companyLocation}  JobTitle={jobDetails.JobTitle} jobId={jobId} />}
        </>
    );
};

export default JobDetails;
