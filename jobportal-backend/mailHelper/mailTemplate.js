export const welcomeMailHtmlTemplate = (PersonType) => {
    const jobseekerTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2E86C1;">Welcome to Our Job Portal!</h2>
        <p>Dear Jobseeker,</p>
        <p>Thank you for signing up! We're excited to help you find the perfect job that fits your skills and career goals.</p>
        <p>Here’s what you can do next:</p>
        <ul>
          <li><strong>Complete your profile:</strong> Adding more details will increase your chances of being noticed by recruiters.</li>
          <li><strong>Explore job opportunities:</strong> Start searching for jobs that match your qualifications.</li>
          <li><strong>Apply for jobs:</strong> Apply for multiple positions and track your applications directly from your dashboard.</li>
        </ul>
        <p>We’re here to support you on your journey to success.</p>
        <p>Good luck!</p>
        <p style="color: #2E86C1;">The Job Portal Team</p>
      </div>
    `;
  
    const recruiterTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #28B463;">Welcome to Our Job Portal!</h2>
        <p>Dear Recruiter,</p>
        <p>We’re thrilled to have you join our platform! We know finding the right talent can be challenging, but with our job portal, the process becomes more seamless and efficient.</p>
        <p>Here’s what you can do next:</p>
        <ul>
          <li><strong>Post job openings:</strong> Start posting job opportunities to attract the best candidates.</li>
          <li><strong>Manage applications:</strong> Review and track candidate applications easily from your dashboard.</li>
          <li><strong>Browse talent profiles:</strong> Search and connect with talented professionals who meet your hiring needs.</li>
        </ul>
        <p>We look forward to helping you build a strong team!</p>
        <p style="color: #28B463;">The Job Portal Team</p>
      </div>
    `;
  
    // Choose the template based on the person type
    return PersonType === "jobseeker" ? jobseekerTemplate : recruiterTemplate;
  };
  