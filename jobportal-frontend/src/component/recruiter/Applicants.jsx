import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card'; // Import Card component for styling

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    async function getApplicants() {
      const apiResponse = await fetch(`/api/v1/recuriter/getApplicants/${jobId}`, {
        method: 'GET',
      });

      const result = await apiResponse.json();
      console.log(result); // Log the result to inspect its structure
      setApplicants(result[0].appliedNumbers);
    }
    getApplicants();
  }, [jobId]);

  const handleStatusChange = async (newStatus,id) => {
    console.log(newStatus,id)
    try{

           const apiResponse=await fetch(`/api/v1/recuriter/updateStatus/${id}`,{
              method:"PUT",
              headers:{
                 'Content-Type':"application/json"
              },
              body: JSON.stringify({ userId: id, status: newStatus, jobId:jobId }),
           })
          const result=await apiResponse.json();

          console.log(result);

    }catch(err){
          console.log(err.message)
    }
      
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Applicants for Job ID: {jobId}</h1>
      {applicants && applicants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applicants.map((applicant, index) => (
            <Card key={index} className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold">{applicant?.jobseeker?.name || "Unknown Name"}</h2>
              <p className="text-gray-600">Email: {applicant?.jobseeker?.email || "N/A"}</p>
              <p className="text-gray-600">Phone: {applicant?.jobseeker?.phno || "N/A"}</p>
              <p className="text-gray-600">Skills: {applicant?.jobseeker?.skills ? applicant.jobseeker.skills.join(', ') : "N/A"}</p>

              <Link to={applicant?.jobseeker?.resume} className='text-blue-400 underline'>
                Resume
              </Link>

              {/* Status Selection */}
              <div className="mt-4">
                <label htmlFor={`status-${index}`} className="block text-gray-700">
                  Status:
                </label>
                <select
                  id={`status-${index}`}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  onChange={(e) => handleStatusChange(e.target.value,applicant._id)}
                >
                  <option value="">Select Status</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Reviewing">Reviewing</option>
                </select>
              </div>

              
             
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No applicants available for this job.</p>
      )}
    </div>
  );
};

export default Applicants;
