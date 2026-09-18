import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () =>
    {
      try {
        const respond = await fetch(`/api/jobs/${id}`) 
        if (!respond.ok) {
          throw new Error("Failed to fetch the specific job");
          }

        const data = await respond.json();

        setJob(data);}
      catch (error) {
        console.error("Error fetching job details: ", error)
      }
    }
  fetchJob();
  }, [id]);


  const navigate = useNavigate();

  const deleteJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete job");
        return;
      }
      console.log("Job deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (!job) {
    return <div>loading...</div>;
  }

  return (
    <div className="job-details">
        <div>
          <h2>{job.title}</h2>
          <p>Description: {job.description}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Type: {job.type}</p>
          <p>Company: {job.company.name}</p>
          <p>Contact Email: {job.company.contactEmail}</p>
          <p>Contact Phone: {job.company.contactPhone}</p>
        </div>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={deleteJob}>Delete Job</button>
    </div>
  );
};

export default JobPage;
