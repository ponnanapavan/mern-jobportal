import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a button component
import { Briefcase, MapPin, DollarSign, Home } from 'lucide-react'; // Importing Lucide icons
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'; // Importing ShadCN Card components
import { Link } from 'react-router-dom';
import { useSocket } from '@/socket-context/SocketJobNotification';

const RecommendedJobs = () => {
  const [formData, setFormData] = useState([]);
  const { newJobs } = useSocket();

  console.log(newJobs);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      {newJobs && newJobs.length > 0 && (
        <div className="max-w-4xl w-full space-y-4"> {/* Increased max-width for larger screens */}
          {newJobs.map((job) => (
            <Card key={job.id} className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
              <CardHeader>
                <p className="text-gray-500 flex items-center mt-1">
                  <Home className="mr-2" />
                  {job.companyName}
                </p>
                <h2 className="text-lg font-bold flex items-center">
                  <Briefcase className="mr-2" />
                  {job.JobTitle}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="flex items-center text-gray-600 mb-2">
                  <MapPin className="mr-2" />
                  {job.companyLocation}
                </p>
                <p className="flex items-center text-green-500 font-semibold">
                  <DollarSign className="mr-2" />
                  {job.salary} {'Lakhs'}
                </p>
                <div className="mt-2">
                  <h3 className="font-semibold">Skills Required:</h3>
                  <div className="flex flex-wrap mt-1">
                    {job.skills && job.skills.length > 0 ? (
                      job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">No skills listed</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end">
                  <Link to={`/jobdetails/${job._id}`}>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {newJobs && newJobs.length === 0 && (
        <p className="text-gray-600">No recommended jobs available at this time.</p>
      )}
    </div>
  );
};

export default RecommendedJobs;
