import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Briefcase, MapPin, Star, User } from 'lucide-react'; // Importing Lucide Icons
import { Button } from '@/components/ui/button'; // Importing Button component from Shadcn UI

const socket = io('http://localhost:5000'); // Connect to the server

const JobAlerts = () => {
    const [newJobs, setNewJobs] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        applications: []
    });

    useEffect(() => {
        socket.on('newJobPosted', (jobData) => {
            setNewJobs((prevJobs) => [...prevJobs, jobData]);
            toast.success(`New job posted: ${jobData.JobTitle} at ${jobData.companyName}`);
        });

        return () => {
            socket.off('newJobPosted');
        };
    }, []);

    const handleApply = (job) => {
        setUserInfo((prev) => ({
            ...prev,
            applications: [...prev.applications, job]
        }));
        toast.info(`Applied for ${job.JobTitle}`);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Welcome, {userInfo.name || 'User'}!</h2>

            <div className="mb-8 p-4 bg-blue-100 rounded-md">
                <h3 className="text-xl font-bold text-gray-700">Profile Information</h3>
                <p className="text-gray-600"><User className="inline mr-1" /> Name: {userInfo.name}</p>
                <p className="text-gray-600">Email: {userInfo.email}</p>
            </div>

            <h2 className="text-3xl font-semibold mb-4 text-gray-800">New Job Postings</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newJobs.map((job, index) => (
                    <li key={index} className="bg-white shadow-md rounded-lg p-5 transition duration-300 hover:shadow-lg">
                        <div className="flex items-center mb-4">
                            <Briefcase className="text-blue-500 h-6 w-6" />
                            <h3 className="text-xl font-bold text-gray-800 ml-2">{job.JobTitle}</h3>
                        </div>
                        <p className="text-gray-600">
                            <MapPin className="inline mr-1" /> {job.companyLocation}
                        </p>
                        <p className="text-gray-600">
                            <Star className="inline mr-1" /> Experience Required: {job.experience}
                        </p>
                        <p className="text-gray-600 mt-2">Skills: {job.skills.join(', ')}</p>
                        <div className="mt-4">
                            <Button 
                                onClick={() => handleApply(job)} 
                                className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
                                Apply Now
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Applications</h2>
                <ul className="space-y-4">
                    {userInfo.applications.map((job, index) => (
                        <li key={index} className="bg-green-100 p-4 rounded-md">
                            <h3 className="text-lg font-bold text-gray-800">{job.JobTitle}</h3>
                            <p className="text-gray-600">Applied at: {job.companyName}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <ToastContainer />
        </div>
    );
};

export default JobAlerts;
