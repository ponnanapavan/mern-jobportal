import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const ResumeUpload = ({formDate,setFormData}) => {
  const [fileName, setFileName] = useState(''); // State to store the selected file name

  async function handleFileChange(e) {
    const formData = new FormData();
    const file = e.target.files[0];
    
    if (file) {
      setFileName(file.name); // Set the file name in state when a file is selected
      formData.append('resume', file);

      try {
        const apiResponse = await fetch('/api/v1/uploadResume', {
          method: 'PUT',
          body: formData,
        });

        const result = await apiResponse.json();
        console.log(result);
      
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-md'>
      <label
        htmlFor="resume-upload"
        className='cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out'
      >
        Upload Resume
      </label>

      <Input
        id="resume-upload"
        type='file'
        className='hidden'
        onChange={handleFileChange}
      />

      {/* Display the selected file name */}
      {fileName && <p className='text-sm text-gray-700'>Selected file: {fileName}</p>}

      <p className='text-sm text-gray-500'>Accepted file types: PDF, DOCX</p>
    </div>
  );
};

export default ResumeUpload;
