import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'; // Make sure to import useEffect
import { Briefcase, MapPin, Clock, Building2, Users2, Loader2 } from 'lucide-react'; // Importing icons from Lucide
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]); // Initialize as an empty array to avoid undefined errors
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function getSavedJobs() {
      try {
        const apiResponse = await fetch('/api/v1/user/getsavedjobs', {
          method: 'GET',
        });
        const response = await apiResponse.json();
        console.log(response);

       
        setSavedJobs(response); 
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false); 
      }
    }

    getSavedJobs();
  }, []);

  return (
    <div className="saved-jobs-container p-4"> 
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
          <span className="ml-2">Loading saved jobs...</span> 
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {savedJobs && savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <Card key={job._id} className="shadow-md p-4 mb-6 rounded-lg"> 
                <CardHeader>
                <CardTitle className="text-xl font-bold flex gap-2"><span>{<Building2/>}</span>{job?.companyName}</CardTitle>
                </CardHeader>
                <CardContent>

                <div className="flex items-center space-x-2 mb-2">
          <Briefcase className="w-5 h-5 text-gray-500" /> 
          <p className="text-md  text-gray-800 font-medium">{job?.JobTitle}<span className='text-sm text-gray-600 ml-2'>{`(${job?.jobType})`}</span></p>
        </div>   
                 
                  <div className="flex items-center mb-2">
                    <MapPin className="mr-2 text-gray-500" /> {/* Gray icon color */}
                    <span className="text-gray-600">{job.companyLocation}</span>
                  </div>
                
                  <div className="flex items-center mb-2">
                    <Building2 className="mr-2 text-gray-500" />
                    <span className="text-gray-600">{job.companyName}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Users2 className="mr-2 text-gray-500" />
                    <span className="text-gray-600">{job.experience} years experience</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
          {job?.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-semibold shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>

                </CardContent>
                <CardFooter className='flex items-center justify-end'>
                <Link to={`/jobdetails/${job._id}`}><Button>ViewDetails</Button></Link>
</CardFooter> 
              </Card>
            ))
          ) : (
            <p>No saved jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
