import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const Skills = ({ setFormData, formData }) => {
  const [skill, setSkill] = useState('');

  console.log(formData)

  function addSkill() {

    if (skill && formData.skills && !formData.skills.includes(skill)) {
     
     
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
    setSkill(''); 
  }

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Your Skills</h2>

      <div className="flex gap-3 mb-4">
        <Input
          type="text"
          value={skill}
          placeholder="Enter your skill"
          onChange={(e) => setSkill(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Skill
        </Button>
      </div>

      <div className="w-full flex flex-wrap gap-2">
        { formData?.skills && formData?.skills.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {formData?.skills.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full shadow-md text-sm font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
