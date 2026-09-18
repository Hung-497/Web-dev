import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJob = async () =>
    {
      try {
        const respond = await fetch(`/api/jobs`) 
        if (!respond.ok) {
          throw new Error("Failed to fetch job");
          }

        const data = await respond.json();

        setJobs(data);}
      catch (error) {
        console.error("Error fetching job details: ", error)
      }
    }
  fetchJob();
  }, []);
   
  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id || job._id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;

