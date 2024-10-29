import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import JobType from './JobType'

const Experience = ({formData,setFormData}) => {
  
    function addEducation(){

      setFormData({...formData,experience:[...formData.experience,{

        experienceType:'',
        companyName:'',
        JobTitle:'',
        YearsOfExperience:'',
        startDate:'',
        endDate:'',
        description:'',
        JobLocation:''
      }]})
         
    }

      
     function remove(index){
          

           setFormData((prevData)=>({
                 ...prevData,
                  experience:prevData.experience.filter((_,idx)=> idx !== index)
           }))
     }

     function handleChange(index,value,name){
      const tempExperience=formData.experience.map((item,idx)=>idx === index ? {...item,[name]:value} : item)
      console.log(tempExperience)
      setFormData({...formData,experience:tempExperience})
     }
  return (
    <div className='flex flex-col w-full gap-3 '>

     {formData.experience && formData.experience.map((item,idx)=>(
          <div className='flex flex-col  w-full'>
          <div className='flex flex-col gap-6 w-full'>
          <div className="w-full max-w-10xl flex justify-around items-center gap-6 p-6 bg-white ">
             <JobType  handleChange={handleChange}  item={item} idx={idx}/>
            </div> 
             <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>companyName</Label>
         <Input type='text' placeholder='enter your companyName'  value={item.companyName}  onChange={(e)=>handleChange(idx,e.target.value,'companyName')}  />
      </div>

      <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>Job Title</Label>
         <Input type='text' placeholder='enter your JobTitle' value={item.JobTitle}  onChange={(e)=>handleChange(idx,e.target.value,'JobTitle')}  />
      </div>

      <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>YearsExperience</Label>
         <Input type='number' placeholder='enter job experience' value={item.YearsOfExperience}  onChange={(e)=>handleChange(idx,e.target.value,'YearsOfExperience')}/>
      </div>

      <div>
    <Label className='text-md font-bold'>JobLocation</Label>
    <Input type='text' placeholder='Enter your joblocation' value={item.JobLocation}  onChange={(e)=>handleChange(idx,e.target.value,'JobLocation')} />
    </div>

    <div>
    <Label className='text-md font-bold'>JobDescription</Label>
    <Input type='text' placeholder='Enter jobdescription' value={item.description}  onChange={(e)=>handleChange(idx,e.target.value,'description')} />
    </div>

    <div className='flex justify-between gap-3'>
    <div>
    <Label className='text-md font-bold'>StartDate</Label>
    <Input type='Date' placeholder='Enter startData' value={item.startDate}  onChange={(e)=>handleChange(idx,e.target.value,'startDate')} />
    </div>

    <div>
    <Label className='text-md font-bold'>endDate</Label>
    <Input type='Date' placeholder='Enter startData' value={item.endDate}  onChange={(e)=>handleChange(idx,e.target.value,'endDate')} />
    </div>


    
    
     </div>

    
          </div>

          <div className='flex justify-between m-4'>
             <Button onClick={()=>addEducation()}>AddExperience</Button>
            {formData.experience.length>1 &&  idx !==0 &&    <Button onClick={()=>remove(idx)}>Remove</Button>}
          </div>

          <div className='border-b-2 border-gray-500 w-full'></div>
          
          </div>
     ))}



     
      
    </div>
  )
}

export default Experience
                   