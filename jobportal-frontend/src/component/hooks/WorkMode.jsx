import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const WorkMode = ({formData,setFormData}) => {
  return (
<>
<Label className="text-lg font-semibold">Workmode</Label>
    <Select value={formData.workMode}  onValueChange={(value)=>setFormData({...formData,workMode:value})}>
      <SelectTrigger className="w-full h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
        <SelectValue placeholder="Select Job Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Hybrid">Hybrid</SelectItem>
        <SelectItem value="Remote">Remote</SelectItem>
        <SelectItem value="OnSite">OnSite</SelectItem>
      </SelectContent>
    </Select>
</>
  )
}

export default WorkMode
