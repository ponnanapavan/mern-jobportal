import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [formData,setFormData]=useState({
       username:'',
       password:'',
       
       
  })
     const router=useNavigate();
  const [loading,setLoading]=useState(false);

  const data=JSON.parse(localStorage.getItem('userData'));



  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
       try{
              

            const apiResponse=await fetch('/api/v1/auth/login',{
                   method:'POST',
                   headers:{
                      'Content-Type':'application/json'
                   },
                   body:JSON.stringify(formData)
            })
                const result=await apiResponse.json();
               if(result.success)
               {
                localStorage.setItem('userData',JSON.stringify(result.userData))
                console.log("result",result)
                if(result.userData.PersonType === 'recruiter')
                  router('/recruiter')
                 else
                 router('/jobseekerProfile')


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
            {loading ?<Button type='submit' className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              <Loader2 className='animate-spin'/>
            </Button>:<Button type='submit' className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Login
            </Button> }
        
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
