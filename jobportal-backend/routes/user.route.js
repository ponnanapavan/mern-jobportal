import express from 'express';
import { Login, Logout, SignUp } from '../controller/auth.controller.js';

const router=express.Router();

router.post('/signup',SignUp)

router.post('/login',Login)

router.post('/logout',Logout)



export {router as authRouther};