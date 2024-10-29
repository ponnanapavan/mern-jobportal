import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, FileText } from 'lucide-react'; // Importing Lucide icons
import { Button } from '@/components/ui/button';
import JobStatusChart from './JobStatusChart';


const DashBoard = () => {
  const [data, setData] = useState();
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const apiResponse = await fetch('/api/v1/user/userProfile', {
          method: 'GET',
        });

        const result = await apiResponse.json();
        console.log(result);
        setData(result.jobseeker);
      } catch (err) {
        console.error(err.message);
      }
    }

    getUserData();
  }, []);

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-6">
      <div className='flex flex-col md:flex-row justify-between w-full'>
        <div className="bg-white p-6 md:p-8 max-w-10xl w-full rounded-lg shadow">
          <div className="flex items-center mb-4">
            <User className="w-12 h-12 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold ml-4">User Profile</h1>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center">
              <User className="w-6 h-6 text-gray-600 mr-3" />
              <p className="text-lg md:text-xl font-semibold">
                Name: <span className="font-normal">{data?.name || 'N/A'}</span>
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-gray-600 mr-3" />
              <p className="text-lg md:text-xl font-semibold">
                Email: <span className="font-normal">{data?.email || 'N/A'}</span>
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-gray-600 mr-3" />
              <p className="text-lg md:text-xl font-semibold">
                Phone: <span className="font-normal">{data?.phno || 'N/A'}</span>
              </p>
            </div>

            {/* Bio */}
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-gray-600 mr-3" />
              <p className="text-lg md:text-xl font-semibold">
                Bio: <span className="font-normal">{data?.userBio || 'No bio provided'}</span>
              </p>
            </div>

            {/* Resume Link */}
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-gray-600 mr-3" />
              <Link
                to={data?.resume || '#'}
                className="text-lg md:text-xl text-blue-600 hover:underline font-semibold"
              >
                View Resume
              </Link>
            </div>

            {/* Project Link */}
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-gray-600 mr-3" />
              <Link
                to={'/project'}
                className="text-lg md:text-xl text-blue-600 hover:underline font-semibold"
              >
                Project
              </Link>
            </div>

            {/* Education Link */}
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-gray-600 mr-3" />
              <Link
                to={'/education'}
                className="text-lg md:text-xl text-blue-600 hover:underline font-semibold"
              >
                Education
              </Link>
            </div>

            {/* Skills */}
            {data?.skills && (
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">Skills:</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='mt-4 md:mt-0'>
          <Button>Update Profile</Button>
        </div>
      </div>

        <div>
          <JobStatusChart/>
        </div>

      <Link to={'/savedjobs'}>
        <div className='flex justify-between items-center w-full p-4 md:p-6 border border-gray-200 bg-gray-50 shadow-md rounded-lg h-[200px]'>
          <div>
            <p className='text-3xl md:text-5xl font-bold text-gray-800'>Saved Jobs</p>
          </div>
          <div className='text-right'>
            <p className='text-4xl md:text-6xl font-extrabold text-blue-600'>
              {data?.savedJobs.length || 0}
            </p>
            <p className='text-lg md:text-lg font-medium text-gray-500'>Total Saved Jobs</p>
          </div>
        </div>
      </Link>

      <Link to={'/appliedJobs'}>
        <div className='flex justify-between items-center w-full p-4 md:p-6 border border-gray-200 bg-gray-50 shadow-md rounded-lg h-[200px]'>
          <div>
            <p className='text-3xl md:text-5xl font-bold text-gray-800'>Applied Jobs</p>
          </div>
          <div className='text-right'>
            <p className='text-4xl md:text-6xl font-extrabold text-blue-600'>
              {data?.appliedJobs.length || 0}
            </p>
            <p className='text-lg md:text-lg font-medium text-gray-500'>Total Applied Jobs</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashBoard;
