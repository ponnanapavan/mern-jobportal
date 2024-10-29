import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';


export const protectRoute=async(req,res,next)=>{
       try{
              const token=req.cookies['job-token'];

              if(!token)
                return res.status(401).json({error:'unauthorized user'});

            const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
            if(!decodeToken){
                return res.status(401).json({error:'unauthorized user'});

            }

            const user=await userModel.findById(decodeToken.userId).select('-password');

            if(!user)
                return res.status(401).json({error:'unauthorized user'});

            req.user=user;

            next();

    

       }catch(err){
          res.status(500).json({error:err.message});

       }
}