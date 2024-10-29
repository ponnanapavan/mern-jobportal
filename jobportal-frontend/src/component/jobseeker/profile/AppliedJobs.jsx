import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Building, MapPin, Briefcase, Clock } from 'lucide-react'; // Importing Lucide icons
import { Link } from 'react-router-dom';

const AppliedJobs = () => {
  const [jobData, setJobData] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    async function getAppliedJobs() {
      try {
        const apiResponse = await fetch('/api/v1/user/getAppliedJobs', {
          method: 'GET',
        });
        const result = await apiResponse.json();
        console.log(result);
        setJobData(result?.jobsArray);
        setUser(result?.user);
      } catch (err) {
        console.error(err.message);
      }
    }
    getAppliedJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'text-green-600'; // Green for approved
      case 'Rejected':
        return 'text-red-600'; // Red for rejected
      default:
        return 'text-yellow-600'; // Yellow for pending
    }
  };

      console.log(jobData)

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-6">Applied Jobs</h2>

      {jobData && jobData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobData.map((job) => (
          <Link to={`/jobdetails/${job._id}`}>
               <Card key={job.id} className="shadow-md">
              <CardHeader>
                <h3 className="text-lg font-bold">{job.jobTitle}</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <Building className="text-gray-600 mr-2" />
                  <p className="text-gray-700">Company: {job?.companyName}</p>
                </div>
                <div className="flex items-center mb-2">
                  <MapPin className="text-gray-600 mr-2" />
                  <p className="text-gray-700">Location: {job?.companyLocation}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Briefcase className="text-gray-600 mr-2" />
                  <p className="text-gray-600 font-semibold">Job Title: {job?.JobTitle}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="text-gray-600 mr-2" />
                  <p className="text-gray-700">Job Type: {job?.jobType}</p>
                </div>
              </CardContent>
              <CardFooter>
                {user && user.length > 0 && (
                  <div>
                    {user.map((item) => (
                      <div key={item.jobId}>
                        {item.jobId === job._id ?
                         (
                          <p className={`font-semibold ${getStatusColor(item.status)}`}>
                            <span className='font-bold'>Status</span>: {item.status}
                          </p>
                        ) 
                        : null}
                      </div>
                    ))}
                  </div>
                )}
              </CardFooter>
            </Card>
          </Link>
          ))}
        </div>
      ) : (
        <p>No applied jobs found.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
