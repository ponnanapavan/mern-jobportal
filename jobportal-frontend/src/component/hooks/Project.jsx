import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

const Project = ({formData,setFormData}) => {
    const [education,setEducation]=useState([
          {

            projectName:'',
            projectTechStack:'',
            projectDescription:'',
            projectLink:'',
            startDate:'',
            endDate:'',
         
          }
    ])

    function addEducation(){

      setFormData({...formData,projects:[...formData.projects,{
        projectName:'',
        projectTechStack:'',
        projectDescription:'',
        projectLink:'',
        startDate:'',
        endDate:'',
      }]})
          setEducation([...education,{

            projectName:'',
            projectTechStack:'',
            projectDescription:'',
            projectLink:'',
            startDate:'',
            endDate:'',
             
          }])
    }

     function remove(index){
         
           setFormData((prevData)=>(
                 {
                    ...prevData,
                    projects:prevData.projects.filter((item,idx)=> idx !== index)
                 }
           ))

           setEducation((prevData)=>prevData.filter((item,idx)=>idx !== index))
     }

     function handleChange(index,value,name){
         const tempProject=formData.projects.map((item,idx)=>idx === index ? {...item,[name]:value} : item)

         setFormData({...formData,projects:tempProject})
     }
  return (
    <div className='flex flex-col w-full gap-3 '>

     {formData.projects && formData?.projects.map((item,idx)=>(
          <div className='flex flex-col  w-full'>
          <div className='flex flex-col gap-6 w-full'>
             <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>projectName</Label>
         <Input type='text' placeholder='enter your projectName'  value={item.projectName} onChange={(e)=>handleChange(idx,e.target.value,'projectName')}/>
      </div>

      <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>projectTechStack</Label>
         <Input type='text' placeholder='enter your projectTechStack' value={item.projectTechStack} onChange={(e)=>handleChange(idx,e.target.value,'projectTechStack')} />
      </div>

      <div className='flex flex-col gap-3'>
         <Label className='text-md font-bold'>projectDescription</Label>
         <Textarea placeholder='Tell about Project' value={item.projectDescription} onChange={(e)=>handleChange(idx,e.target.value,'projectDescription')} />
      </div>

      <div className='flex flex-col gap-3'>
   <Label className='text-md font-bold'>ProjectLink</Label>
   <Input type='url' placeholder='Enter your projectLink' value={item.projectLink} onChange={(e)=>handleChange(idx,e.target.value,'projectLink')}  />
     </div>

    <div className='flex justify-between gap-3'>
    <div>
    <Label className='text-md font-bold'>StartDate</Label>
    <Input type='Date' placeholder='Enter startData' value={item.startDate} onChange={(e)=>handleChange(idx,e.target.value,'startDate')} />
    </div>

    <div>
    <Label className='text-md font-bold'>EndDate</Label>
    <Input type='Date' placeholder='Enter startData'  value={item.endDate} onChange={(e)=>handleChange(idx,e.target.value,'endDate')} />
    </div>

    
     </div>

    
          </div>

          <div className='flex justify-between m-4'>
             <Button onClick={()=>addEducation()}>AddProject</Button>
            {formData.projects.length>1 &&  idx !==0 &&    <Button onClick={()=>remove(idx)}>Remove</Button>}
          </div>

          <div className='border-b-2 border-gray-500 w-full'></div>
          
          </div>
     ))}



     
      
    </div>
  )
}

export default Project
// {
//     projectName:{type:String},
//     projectTechStack:{type:String},
//     startDate:{type:String},
//     endDate:{type:String},
//     projectDescription:{type:String},
//     projectLink:{type:String}
// }