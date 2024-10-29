import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Building2, Users2, Loader2, Factory, Users, DollarSign } from 'lucide-react'; // Importing icons from Lucide
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const JobList = ({ job, setUserData, userData }) => {
  const [loading, setLoading] = useState(false);

  async function handleSaveJob() {
    setLoading(true);
    try {
      const apiResponse = await fetch(`/api/v1/user/saveJob/${job._id}`, {
        method: 'POST',
      });
      const result = await apiResponse.json();
      if (result.success) {
        setUserData((prevData) => ({
          ...prevData,
          savedJobs: [...prevData.savedJobs, job._id],
        }));
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-3 shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex gap-2">
          <span>{<Building2 />}</span>
          {job?.companyName}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <p className="text-md text-gray-800 font-medium">
            {job?.JobTitle}
            <span className='text-sm text-gray-600 ml-2'>{`(${job?.jobType})`}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-600">{job?.companyLocation}</p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-600">
            {job?.experience === 0 ? 'Fresher' : `${job?.experience} years`}
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Factory className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-600">{job?.companyType}</p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-600">{job?.companySize} employees</p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-600">{job?.workMode}</p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-600">{job?.salary} {'Lakhs'}</p>
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

        <div className='mt-3 flex gap-3'>
          <Users2 />
          <p>{job?.appliedNumbers.length} {'applied'}</p>
        </div>
      </CardContent>
      
      <CardFooter className='flex w-full justify-between items-center'>
        <div>
          {userData.savedJobs && userData.savedJobs.includes(job._id) ? (
            <Button disabled={true}>Saved</Button>
          ) : (
            <Button onClick={() => handleSaveJob()}>Save</Button>
          )}
        </div>

        <Link to={`/jobdetails/${job._id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobList;
