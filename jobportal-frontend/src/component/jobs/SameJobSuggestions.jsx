import React, { useEffect, useState } from 'react';
import JobList from '../hooks/JobList';

const SameJobSuggestions = (props) => {
    const { companyName, companyLocation, JobTitle, jobId } = props;

    const [suggestJobs, setSuggestJobs] = useState([]);
    const [userData, setUserData] = useState();

    useEffect(() => {
        async function getJob() {
            try {
                const apiResponse = await fetch(`/api/v1/user/getSuggestions/${jobId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type
                    },
                    body: JSON.stringify({
                        companyName,
                        companyLocation,
                        JobTitle
                    }),
                });

                const result = await apiResponse.json();
                setSuggestJobs(result.suggestionsJobs);
                setUserData(result?.user?.jobseeker);

            } catch (err) {
                console.error(err.message);
            }
        }
        getJob();
    }, [companyName, companyLocation, JobTitle]);

    return (
        <div className="max-w-8xl mx-auto p-5 sm:p-8 lg:p-10">
            <p className="text-2xl font-semibold mb-4">Hot Job Suggestions Just for You 🔥🔥</p>
            {suggestJobs.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {suggestJobs.map((job, idx) => (
                        <JobList key={idx} job={job} userData={userData} setUserData={setUserData} />
                    ))}
                </div>
            ) : (
                <div className="text-center">{"Their is not jobs suggested for you"}</div>
            )}
        </div>
    );
}

export default SameJobSuggestions;
