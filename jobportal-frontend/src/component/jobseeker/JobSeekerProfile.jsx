import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import Skills from '../hooks/Skills';
import Education from '../hooks/Education';
import Project from '../hooks/Project';
import WorkMode from '../hooks/WorkMode';
import Availablity from '../hooks/Availablity';
import Experience from '../hooks/Experience';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import ResumeUpload from '../hooks/ResumeUpload';
import { Button } from '@/components/ui/button';

const JobSeekerProfile = () => {
  const [project, setProject] = useState(false);
  const [education, setEducation] = useState(false);
  const [experience, setExperience] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phno: '',
    userBio: '',
    location: '',
    SalaryExceptation: 0,
    workMode: '',
    availablity: '',
    education: [{
      CollegeName: '',
      degree: '',
      branch: '',
      startDate: '',
      endDate: '',
      cgpa: 0
    }],
    projects: [{
      projectName: '',
      projectTechStack: '',
      projectDescription: '',
      projectLink: '',
      startDate: '',
      endDate: '',
    }],
    experience: [{
      experienceType: '',
      companyName: '',
      JobTitle: '',
      YearsOfExperience: '',
      startDate: '',
      endDate: '',
      description: '',
      JobLocation: ''
    }],
    skills: [],
   
  });

  console.log(formData)

  async function onSubmit() {
    setLoading(true);
    try {
      const apiResponse = await fetch('/api/v1/user/createUserProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await apiResponse.json();
      console.log(result);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-full p-3 flex gap-6 flex-col text-xl bg-white dark:bg-gray-900 text-black dark:text-white'>
      <div className='flex flex-col gap-3'>
        <Label className='text-md font-bold'>Name</Label>
        <Input
          type='text'
          placeholder='Enter your name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='h-12 text-lg bg-gray-100 dark:bg-gray-800 dark:text-white' // Adjusted for dark mode
        />
      </div>

      <div className='flex flex-col gap-3'>
        <Label className='text-md font-bold'>Email</Label>
        <Input
          type='email'
          placeholder='Enter your email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='h-12 text-lg bg-gray-100 dark:bg-gray-800 dark:text-white'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <Label className='text-md font-bold'>Phone</Label>
        <Input
          type='text'
          placeholder='Enter your phone number'
          value={formData.phno}
          onChange={(e) => setFormData({ ...formData, phno: e.target.value })}
          className='h-12 text-lg bg-gray-100 dark:bg-gray-800 dark:text-white'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <Label className='text-md font-bold'>User Bio</Label>
        <Input
          type='text'
          placeholder='Enter some information about you'
          value={formData.userBio}
          onChange={(e) => setFormData({ ...formData, userBio: e.target.value })}
          className='h-12 text-lg bg-gray-100 dark:bg-gray-800 dark:text-white'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <Label className='text-md font-bold'>Location</Label>
        <Input
          type='text'
          placeholder='Enter your location'
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className='h-12 text-lg bg-gray-100 dark:bg-gray-800 dark:text-white'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <Label className='text-md font-bold'>Salary Expectation</Label>
        <Input
          type='number'
          placeholder='Enter your salary expectation'
          value={formData.SalaryExceptation}
          onChange={(e) => setFormData({ ...formData, SalaryExceptation: e.target.value })}
          className='h-12 text-lg bg-gray-100 dark:bg-gray-800 dark:text-white'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>Resume Upload</h2>
        <ResumeUpload formData={formData} setFormData={setFormData} />
      </div>

      <div className="w-full max-w-10xl flex justify-around items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <WorkMode formData={formData} setFormData={setFormData} />
        <Availablity formData={formData} setFormData={setFormData} />
      </div>

      <Skills formData={formData} setFormData={setFormData} />

      <div>
        <h2
          className='text-2xl font-bold flex items-center justify-between cursor-pointer'
          onClick={() => setEducation(!education)}
        >
          Education:
          {education ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Click to {education ? "hide" : "show"} education details</p>
        {education && (
          <div className='border-2 border-gray-200 dark:border-gray-600 p-5 rounded-lg'>
            <Education formData={formData} setFormData={setFormData} />
          </div>
        )}
      </div>

      <div>
        <h2
          className='text-2xl font-bold flex items-center justify-between cursor-pointer'
          onClick={() => setProject(!project)}
        >
          Project:
          {project ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Click to {project ? "hide" : "show"} project details</p>
        {project && (
          <div className='border-2 border-gray-200 dark:border-gray-600 p-5 rounded-lg'>
            <Project formData={formData} setFormData={setFormData} />
          </div>
        )}
      </div>

      <div>
        <h2
          className='text-2xl font-bold flex items-center justify-between cursor-pointer'
          onClick={() => setExperience(!experience)}
        >
          Experience:
          {experience ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Click to {experience ? "hide" : "show"} experience details</p>
        {experience && (
          <div className='border-2 border-gray-200 dark:border-gray-600 p-5 rounded-lg'>
            <Experience formData={formData} setFormData={setFormData} />
          </div>
        )}
      </div>

     

      <div className='w-full flex justify-center items-center '>
        {loading ? <Button><Loader2 /></Button> : <Button className='w-[300px]' onClick={() => onSubmit()}>Save Profile</Button>}
      </div>
    </div>
  );
};

export default JobSeekerProfile;
