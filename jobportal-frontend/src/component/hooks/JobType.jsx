import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const JobType= ({handleChange,item,idx}) => {

  return (
<>
<Label className="text-lg font-semibold">JobType</Label>
  <Select value={item?.experience?.experienceType} onValueChange={(value)=>handleChange(idx,value,'experienceType')}>
      <SelectTrigger className="w-full h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
        <SelectValue placeholder="Select Job Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="FullTime">FullTime</SelectItem>
        <SelectItem value="PartTime">PartTime</SelectItem>
        <SelectItem value="Internship">Internship</SelectItem>
      </SelectContent>
    </Select>
</>
  )
}

export default JobType
