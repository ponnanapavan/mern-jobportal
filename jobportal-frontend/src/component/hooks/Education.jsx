import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const Education = ({formData,setFormData}) => {

  console.log(formData?.education)
  

    function addEducation(){

      setFormData(
        {...formData,
        education:[
          ...formData.education,
          {

        CollegeName:'',
        degree:'',
        branch:'',
        startDate:'',
        endDate:'',
        cgpa:0
         
        }]
      }
      )
    }
         

     function remove(index){
          
           setFormData((prevData)=>(
               {
                   ...prevData,
                   education:prevData.education.filter((item,idx)=>idx !== index)
               }
           ))
     }


     function handleChange(index,value,name){


      console.log(value,name,index)

      const tempEducation = formData.education.map((edu, i) => 
        i === index ? { ...edu, [name]: value } : edu
      );
    
      setFormData({ ...formData, education: tempEducation });

        
     }
  return (
    <div className='flex flex-col w-full gap-3 '>

     {formData.education && formData.education.map((item,idx)=>(
          <div className='flex flex-col  w-full'>
          <div className='flex flex-col gap-6 w-full'>
             <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>CollegeName</Label>
         <Input type='text' placeholder='enter your collegeName'  value={item.CollegeName}  onChange={(e)=>handleChange(idx,e.target.value,'CollegeName')}/>
      </div>

      <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>Degree</Label>
         <Input type='text' placeholder='enter your Degree' value={item.degree}  onChange={(e)=>handleChange(idx,e.target.value,'degree')} />
      </div>

      <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>Branch</Label>
         <Input type='text' placeholder='enter your Branch' value={item.branch}  onChange={(e)=>handleChange(idx,e.target.value,'branch')} />
      </div>

      <div className='flex flex-col gap-3'>
   <Label className='text-md font-bold'>CGPA</Label>
   <Input type='number' placeholder='Enter your CGPA' step="0.01" min="0" max="10" value={item.cgpa}  onChange={(e)=>handleChange(idx,e.target.value,'cgpa')} />
     </div>

    <div className='flex justify-between gap-3'>
    <div>
    <Label className='text-md font-bold'>StartDate</Label>
    <Input type='Date' placeholder='Enter startData' value={item.startDate}  onChange={(e)=>handleChange(idx,e.target.value,'startDate')}  />
    </div>

    <div>
    <Label className='text-md font-bold'>EndDate</Label>
    <Input type='Date' placeholder='Enter startData' value={item.endDate}  onChange={(e)=>handleChange(idx,e.target.value,'endDate')} />
    </div>

    
     </div>

    
          </div>

          <div className='flex justify-between m-4'>
             <Button onClick={()=>addEducation()}>AddEducation</Button>
            {formData?.education.length>1 &&  idx !==0 &&    <Button onClick={()=>remove(idx)}>Remove</Button>}
          </div>

          <div className='border-b-2 border-gray-500 w-full'></div>
          
          </div>
     ))}



     
      
    </div>
  )
}

export default Education
// CollegeName:{type:String},
//                           collegeType:{type:String},
//                           degree:{type:String},
//                           Branch:{type:String},
//                           startDate:{type:Date},
//                           endDate:{type:Date}