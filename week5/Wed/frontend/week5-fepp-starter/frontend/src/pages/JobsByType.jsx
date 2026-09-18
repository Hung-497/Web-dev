import { useEffect, useState } from "react";
import JobListing from "../components/JobListing";

const JobsByType = () => {
    const [jobs, setJobs] = useState([]);
    const [type, setJobType] = useState("Full-time");

    useEffect(() => {
        const fetchJobsByType = async () => {
            if (!type) {
                return;
            }
            try {
                const res = await fetch(`/api/jobs/type/${encodeURIComponent(type)}`);
                if (!res.ok) {
                    console.error("Failed to fetch jobs by type");
                }
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs by type:", error);
            }
        };
        fetchJobsByType();
    }, [type]);

    return (
        <div className="jobs-by-type">
            <h2>Jobs by Type</h2>
            <select
                value={type}
                onChange={(e) => setJobType(e.target.value)}
            >
                <option value="Full-time">Full-Time</option>
                <option value="Part-time">Part-Time</option>
                <option value="Contract">Contract</option>
            </select>
            <div className="job-list">
                {jobs.length === 0 && <p>No jobs found for this type.</p>}
                {jobs.length !== 0 &&
                    jobs.map((job) => <JobListing key={job.id || job._id} {...job} />)}
            </div>
        </div>
    )
}

export default JobsByType;