import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  // const [title, setTitle] = useState("");
  // const [type, setType] = useState("Full-Time");
  // const [location, setLocation] = useState("");
  // const [description, setDescription] = useState("");
  // const [salary, setSalary] = useState(4500);
  // const [companyName, setCompanyName] = useState("");
  // const [contactEmail, setContactEmail] = useState("");
  // const [contactPhone, setContactPhone] = useState("");

  const [newJob, setNewJob] = useState({
    title: "",
    type: "Full-time",
    location: "",
    description: "",
    salary: 4500,
    company: {
      name: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const companyFields = ["name", "contactEmail", "contactPhone"];
    if (companyFields.includes(name)) {
      setNewJob((prevJob) => ({
        ...prevJob,
        company: {
          ...prevJob.company,
          [name]: value,
        },
      }));
    } else {
      setNewJob((prevJob) => ({
        ...prevJob,
        [name]: value,
      }));
    }
  };

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleTypeChange = (e) => {
  //   setType(e.target.value);
  // };

  // const handleLocationChange = (e) => {
  //   setLocation(e.target.value);
  // };

  // const handleDescriptionChange = (e) => {
  //   setDescription(e.target.value);
  // };

  // const handleCompanyNameChange = (e) => {
  //   setCompanyName(e.target.value);
  // };

  // const handleContactEmailChange = (e) => {
  //   setContactEmail(e.target.value);
  // };

  // const handleContactPhoneChange = (e) => {
  //   setContactPhone(e.target.value);
  // };

  // const handleSalaryChange = (e) => {
  //   setSalary(e.target.value);
  // };

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (
      !newJob.title ||
      !newJob.type ||
      !newJob.company.name ||
      !newJob.company.contactEmail
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    const JobToAdd = {
      title: newJob.title,
      type: newJob.type,
      description: newJob.description,
      location: newJob.location,
      salary: newJob.salary,
      company: {
        name: newJob.company.name,
        contactEmail: newJob.company.contactEmail,
        contactPhone: newJob.company.contactPhone,
      },
    };

    addJob(JobToAdd);
  };

  const addJob = async (job) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        console.error("Failed to add job");
      } else {
        console.log("Job added successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Job title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={newJob.title}
          onChange={handleInputChange}
        />
        <label htmlFor="type">Job type:</label>
        <select
          id="type"
          name="type"
          value={newJob.type}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          value={newJob.description}
          name="description"
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          name="name"
          type="text"
          value={newJob.company.name}
          onChange={handleInputChange}
        />
        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          id="contactEmail"
          name="contactEmail"
          type="email"
          value={newJob.company.contactEmail}
          onChange={handleInputChange}
        />
        <label htmlFor="contactPhone">Contact Phone:</label>
        <input
          id="contactPhone"
          name="contactPhone"
          type="tel"
          value={newJob.company.contactPhone}
          onChange={handleInputChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          type="text"
          value={newJob.location}
          onChange={handleInputChange}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          name="salary"
          type="text"
          value={newJob.salary}
          onChange={handleInputChange}
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
