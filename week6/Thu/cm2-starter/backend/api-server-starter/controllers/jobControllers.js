const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// get all jobs
const getJob = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit);
    const jobs = limit
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sever error" });
  }
};

// add one job
const addJob = async (req, res) => {
  const { title, type, location, description, salary, company } = req.body;

  try {
    const newJob = new Job({
      title,
      type,
      location,
      description,
      salary,
      company,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get job by id
const getJobById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such job like that" });
  }

  try {
    const job = await Job.findOne({ _id:id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// delete job by id
const deleteJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedjob = await Job.findByIdAndDelete({
      _id:id,
    });
    if (!deletedjob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// update job by id
const updateJobById = async (req, res) => {
  const { id } = req.params;    
  // console.log(Job.findById({_id:id}));
  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id:id },
      { ...req.body },
      { new: true },
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found"});
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getJob,
  getJobById,
  updateJobById,
  deleteJobById,
  addJob,
};
