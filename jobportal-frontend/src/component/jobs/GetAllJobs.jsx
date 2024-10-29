import React, { useEffect, useState } from 'react';
import JobList from '../hooks/JobList';
import SearchJobs from '../jobseeker/job-filter/SearchJobs';

const GetAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);    // Track current page
  const [limit] = useState(5);            // Limit of jobs per page
  const [totalJobs, setTotalJobs] = useState(0); // Total number of jobs
  const [userData,setUserData]=useState();

  useEffect(() => {
    async function getAllPosts() {
      try {
        const apiResponse = await fetch(`/api/v1/recuriter/getallJobs?page=${page}&limit=${limit}`, {
          method: 'GET',
        });
        const result = await apiResponse.json();
        console.log(result);

        setJobs(result.jobs);          
        setTotalJobs(result.totalJobs); 
        setUserData(result.user.jobseeker)
      } catch (err) {
        console.error(err.message);
      }
    }
    getAllPosts();
  }, [page]); 


  console.log(userData)
 
  const handleNextPage = () => {
    if (page * limit < totalJobs) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="w-full h-full">

      <SearchJobs jobs={jobs} setJobs={setJobs}/>
      {jobs?.length > 0 ? (
        <div className="max-w-6xl mx-auto p-5 sm:p-8 lg:p-8">
         
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            {jobs.map((item, idx) => (
             
                <JobList key={idx} job={item}  setUserData={setUserData} userData={userData} />
            
            ))}
          </div>

          
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={handlePreviousPage}
              disabled={page === 1} // Disable if it's the first page
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={handleNextPage}
              disabled={page * limit >= totalJobs} 
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default GetAllJobs;
