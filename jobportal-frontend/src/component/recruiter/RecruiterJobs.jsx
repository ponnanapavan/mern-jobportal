import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Importing Card components
import { Building2, MapPin, Clock, Users } from 'lucide-react'; // Importing icons from Lucide
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RecruiterJobs = () => {
  const [jobsData, setJobsData] = useState();

  useEffect(() => {
    async function getJobs() {
      const apiResponse = await fetch('/api/v1/recuriter/getRecruiterJobs', {
        method: 'GET',
      });
      const result = await apiResponse.json();
      console.log(result)
      setJobsData(result.recuriter);
    }
    getJobs();
  }, []);

  return (
    <div className='w-full grid grid-cols-3 gap-4 p-5'>
      {jobsData && jobsData.length > 0 ? (
        jobsData.map((job, index) => (
          <Card key={index} className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-gray-500" />
                {job.companyName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">{job.JobTitle}</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">{job.companyLocation}</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">{job.companySize} employees</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {/* Work Mode Display */}
                <span className="w-5 h-5 text-gray-500">🖥️</span> {/* Optional: Use an icon */}
                <p className="text-sm text-gray-600">{job.workMode}</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {/* Job Type Display */}
                <span className="w-5 h-5 text-gray-500">💼</span> {/* Optional: Use an icon */}
                <p className="text-sm text-gray-600">{job.jobType}</p>
              </div>
            </CardContent>
            <div className="flex justify-between items-center p-4">
                <Link to={`/applicants/${job._id}`}>
                <Button>Applicants Details</Button>
                </Link>
              
            </div>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No jobs available</p>
      )}
    </div>
  );
};

export default RecruiterJobs;
