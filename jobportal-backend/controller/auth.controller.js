import checkPassword from "../helper/passwordCheck.js";
import { sendWelcomeMail } from "../mailHelper/mailHandler.js";
import userModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

export const  SignUp=async(req,res)=>{
    
       try{
            const {name,username,password,email, PersonType}=req.body;

           const checkUser=await userModel.findOne({username});
           if(checkUser){
                return res.status(400).json({"error":"user exist"})
           }
           
               if(!checkPassword(password)){
                res.status(400).json({error:'password not strong'})
                 
               }

               const hashpassword=await bcrypt.hash(password,10);



           const newUser=new userModel({name,username,password:hashpassword,email, PersonType});

     
           await newUser.save();

           generateToken(newUser._id,res);

        //    try{
        //     await sendWelcomeMail(email,PersonType);
            
        //    }catch(err){
        //         res.status(500).json({error:er.message});
        //    }

           res.status(201).json({userData:{'PersonType':newUser?.PersonType,'userid':newUser?._id},message:"register successfully",success:true})
        
    
       }catch(err){
           res.status(400).json({error:err.message,success:false})
       }
}


export const Login=async(req,res)=>{

    try{
           const {username,password}=req.body;
           

           const checkUser=await userModel.findOne({username} );

           if(!checkUser){
               return res.status(401).json({error:"user not found"})
           }
           const checkPassword=await bcrypt.compare(password,checkUser.password);

           if(!checkPassword){

            return res.status(401).json({error:"password not match"})
               
           }
               generateToken(checkUser._id,res);

               res.status(201).json({userData:{'PersonType':checkUser?.PersonType,'userid':checkUser?._id},message:"register successfully",success:true})

    }catch(err){
           res.status(500).json({error:err.message,success:false})
        
    }
      
}


export const Logout=async(req,res)=>{
      try{
        res.clearCookie("job-token");

        res.status(200).json({message:"Logout successfully",success:true});

      }catch(err){

        res.status(500),json({error:err.message,success:false});
         
      }
}
