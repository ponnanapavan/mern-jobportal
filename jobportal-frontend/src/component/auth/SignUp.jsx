import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [personType, setPersonType] = useState('jobseeker');
  const [formData,setFormData]=useState({
       username:'',
       password:'',
       email:'',
       name:'',
       PersonType:'',
       
  })
     const router=useNavigate();
  const [loading,setLoading]=useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
       try{
              formData['PersonType']=personType

            const apiResponse=await fetch('/api/v1/auth/signup',{
                   method:'POST',
                   headers:{
                      'Content-Type':'application/json'
                   },
                   body:JSON.stringify(formData)
            })
                const result=await apiResponse.json();
                console.log(result);
                if(result.success){
                    router('/auth/login')
                    localStorage.setItem('userData',JSON.stringify(result.userData));

                }
               

       }catch(err){
          console.error(err.message);
       }finally{
           setLoading(false);
       }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create an Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Username</Label>
            <Input 
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1"
              value={formData.username}
              onChange={(e)=>setFormData({...formData,username:e.target.value})}
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Name</Label>
            <Input 
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-1"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Email</Label>
            <Input 
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value})}

            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Password</Label>
            <Input 
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">I am a</Label>
            <div className="mt-1 flex space-x-4">
              <button 
                type="button"
                onClick={() => setPersonType('job-seeker')}
                className={`px-4 py-2 border rounded-lg shadow-sm ${personType === 'jobseeker' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'} focus:outline-none transition duration-200`}
              >
                Job Seeker
              </button>
              <button 
                type="button"
                onClick={() => setPersonType('recruiter')}
                className={`px-4 py-2 border rounded-lg shadow-sm ${personType === 'recruiter' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'} focus:outline-none transition duration-200`}
              >
                Recruiter
              </button>
            </div>
          </div>

          <div>
            {loading ?<Button type='submit' className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              <Loader2 className='animate-spin'/>
            </Button>:<Button type='submit' className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Sign Up
            </Button> }

        <div className='text-center w-full'>
        <p className='font-bold text-md'>If you have account <span className='text-blue-500 font-bold'><Link to={'/auth/login'}>Login</Link></span></p>
        </div>
        
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
