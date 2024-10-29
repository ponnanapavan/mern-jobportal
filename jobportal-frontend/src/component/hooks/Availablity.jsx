import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const Availablity = ({formData,setFormData}) => {
  return (
<>
<Label className="text-lg font-semibold">availablity</Label>
    <Select value={formData.availablity} onValueChange={(value)=>setFormData({...formData, availablity:value})}>
      <SelectTrigger className="w-full h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
        <SelectValue placeholder="Select Job Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="immediately">immediately</SelectItem>
        <SelectItem value="within 1 month">within 1 month</SelectItem>
        <SelectItem value="within 3 months">within 3 months</SelectItem>
      </SelectContent>
    </Select>
</>
  )
}

export default Availablity
