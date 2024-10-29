import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getAllJobs, getApplicants, getRecruiterJobs, jobPost, updateStatus } from '../controller/recuriter.controller.js';


const router=express.Router();

router.post('/postJob',protectRoute,(req,res)=>jobPost(req,res,req.app.io))

router.get('/getallJobs',protectRoute,getAllJobs)

router.get('/getRecruiterJobs',protectRoute,getRecruiterJobs)

router.get('/getApplicants/:jobId',protectRoute,getApplicants);


router.put('/updateStatus/:userId',protectRoute,updateStatus)



export {router as recuriterRouter}