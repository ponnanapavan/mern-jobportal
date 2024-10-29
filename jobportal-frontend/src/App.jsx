
import './App.css'
import Login from './component/auth/Login'
import SignUp from './component/auth/SignUp'
import Header from './component/Header'

import { Routes, Route, useNavigate } from 'react-router-dom'
import JobPost from './component/recruiter/JobPost'
import GetAllJobs from './component/jobs/GetAllJobs'
import JobSeekerProfile from './component/jobseeker/JobSeekerProfile'
import DashBoard from './component/jobseeker/DashBoard'
import JobDetails from './component/jobs/JobDetails'
import ProjectProfile from './component/jobseeker/profile/ProjectProfile'
import EducationProfile from './component/jobseeker/profile/EducationProfile'
import SavedJobs from './component/jobs/SavedJobs'
import RecruiterJobs from './component/recruiter/RecruiterJobs'
import Applicants from './component/recruiter/Applicants'
import AppliedJobs from './component/jobseeker/profile/AppliedJobs'
import RecommendedJobs from './component/jobseeker/RecommendedJobs'





function App() {

    



  return (
      <>
          <Header/>

          <Routes>
              <Route path='/auth/signup'  element={<SignUp/>}/>
              <Route path='/auth/login' element={<Login/>}/>
              <Route path='/recruiter' element={<JobPost/>}/>
              <Route path='/alljobs' element={<GetAllJobs/>}/>
              <Route path='/jobseekerProfile' element={<JobSeekerProfile/>}/>
              <Route path='/dashboard' element={<DashBoard/>}/>
              <Route path='/jobdetails/:jobId' element={<JobDetails/>}/>
              <Route path='/project'element={<ProjectProfile/>}/>
              <Route path='/education' element={<EducationProfile/>}/>
              <Route path='/savedjobs' element={<SavedJobs/>}/>

            <Route path='/recruiterJobs'  element={<RecruiterJobs/>}/>
            <Route path='/applicants/:jobId' element={<Applicants/>}/>
            <Route path='/appliedJobs' element={<AppliedJobs/>}/>

            <Route path='/recommendedJobs' element={<RecommendedJobs/>}/>
            
            
          </Routes>
      </>
  )
}

export default App
