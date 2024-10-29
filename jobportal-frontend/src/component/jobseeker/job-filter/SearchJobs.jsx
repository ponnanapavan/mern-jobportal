import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const SearchJobs = ({setJobs}) => {

const [formData,setFormData]=useState({
    companyLocation:'',
      JobTitle:'',
      experience:0
})

async function handleSearch(){



        try{
              const apiResponse=await fetch('/api/v1/user/filterJobs',{
                   method:'POST',
                   headers:{
                     'Content-Type':'application/json'
                   },
                   body:JSON.stringify(formData)
              })

              const response=await apiResponse.json();

              setJobs(response)

              console.log(response);
               

        }catch(err){
              console.error(err.message)
        }

    }

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
    <Input 
        type="text" 
        placeholder="Enter job title" 
        value={formData.JobTitle}
        onChange={(e)=>setFormData((prevData)=>({...prevData,JobTitle:e.target.value} ))}
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
    />
    <Input 
        type="text" 
        placeholder="Enter job location" 
        value={formData.companyLocation}
        onChange={(e)=>setFormData((prevData)=>({...prevData,companyLocation:e.target.value} ))}
        className="flex-1 mx-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
    />
    <Input 
        type="number" 
        placeholder="Enter experience in years" 
        value={formData.experience}
        onChange={(e)=>setFormData((prevData)=>({...prevData,experience:e.target.value} ))}
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
    />
    <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200" onClick={()=>handleSearch()}>
        Search
    </Button>
</div>

  )
}

export default SearchJobs
