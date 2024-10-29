import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import Skills from '../hooks/Skills'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const JobPost = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyLocation: "",
    jobDescription: "",
    JobTitle: "",
    experience: "",
    skills: [],
    jobType: "",
    availablity: "",
    companySize: '',
    companyType: '',
    workMode: '',
    salary:0
  })

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true)
    try {
      const apiResponse = await fetch('/api/v1/recuriter/postJob', {
        method: 'POST',
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
    <div className='w-full h-full p-6 flex flex-col gap-6 bg-gray-50 shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold text-center'>Post a Job</h2>

      {/* Company Name */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Company Name</Label>
        <Input type='text' placeholder='Enter company name' value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Company Location */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Company Location</Label>
        <Input type='text' placeholder='Enter company location' value={formData.companyLocation} onChange={(e) => setFormData({ ...formData, companyLocation: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Job Title */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Job Title</Label>
        <Input type='text' placeholder='Enter job title' value={formData.JobTitle} onChange={(e) => setFormData({ ...formData, JobTitle: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Job Description */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Job Description</Label>
        <Textarea placeholder='Enter job description' value={formData.jobDescription} onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Job Experience */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Job Experience (Years)</Label>
        <Input type='number' placeholder='Enter job experience' value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Company Size */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Company Size</Label>
        <Input type='text' placeholder='Enter company size' value={formData.companySize} onChange={(e) => setFormData({ ...formData, companySize: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Company Type */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Company Type</Label>
        <Input type='text' placeholder='Enter company type' value={formData.companyType} onChange={(e) => setFormData({ ...formData, companyType: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Salary</Label>
        <Input type='number' placeholder='Enter company type' value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Work Mode */}
      <div className='flex flex-col gap-2'>
        <Label className='text-md font-semibold'>Work Mode</Label>
        <Input type='text' placeholder='Enter work mode' value={formData.workMode} onChange={(e) => setFormData({ ...formData, workMode: e.target.value })} className='border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition duration-200' />
      </div>

      {/* Skills Section */}
      <div>
        <Skills setFormData={setFormData} formData={formData} />
      </div>

      {/* Job Type and Availability Select */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-1/2">
          <Label className="text-lg font-semibold">Job Type</Label>
          <Select value={formData.jobType} onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
            <SelectTrigger className="border-gray-300 rounded-md focus:ring focus:ring-blue-400">
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FullTime">FullTime</SelectItem>
              <SelectItem value="PartTime">PartTime</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <Label className="text-lg font-semibold">Availability</Label>
          <Select value={formData.availablity} onValueChange={(value) => setFormData({ ...formData, availablity: value })}>
            <SelectTrigger className="border-gray-300 rounded-md focus:ring focus:ring-blue-400">
              <SelectValue placeholder="Select Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediately">Immediately</SelectItem>
              <SelectItem value="within 1 month">Within 1 Month</SelectItem>
              <SelectItem value="within 3 months">Within 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className='flex justify-center'>
        {loading ? (
          <Button className='p-5 w-[400px] text-xl font-bold flex justify-center items-center' disabled>
            <Loader2 className='animate-spin' />
            <span className='ml-2'>Loading...</span>
          </Button>
        ) : (
          <Button className='p-5 w-[400px] text-xl font-bold bg-blue-600 hover:bg-blue-700 transition duration-200' onClick={() => handleSubmit()}>
            Save Job
          </Button>
        )}
      </div>
    </div>
  )
}

export default JobPost;
