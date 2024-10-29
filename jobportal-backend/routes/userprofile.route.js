import express from 'express'
import { applyJob, filterJobs, getAppliedJobs, getCountOfStatus, getJob, getRecommendedJobs, getSameJobSuggestions, getSavedJobs, getUserProfile, saveJob, storeUserData } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();


router.put('/createUserProfile', protectRoute ,storeUserData)

router.get('/userProfile',protectRoute,getUserProfile)

router.post('/saveJob/:jobId',protectRoute,saveJob)


router.get('/getjob/:jobId',protectRoute,getJob)

router.post('/applyjob/:jobId',protectRoute,applyJob)


router.post('/getSuggestions/:jobId',protectRoute,getSameJobSuggestions);

router.get('/getsavedjobs',protectRoute,getSavedJobs)

router.get('/getAppliedJobs',protectRoute,getAppliedJobs)

// router.get('/getRecommendedJobs',protectRoute,getRecommendedJobs)


router.post('/filterJobs',protectRoute,filterJobs)

router.get('/getstatuscount',protectRoute,getCountOfStatus)

export {router as userProfileRouter}

