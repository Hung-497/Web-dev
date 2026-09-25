const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { getJob,
  getJobById,
  updateJobById,
  deleteJobById,
  addJob,
} = require("../controllers/jobControllers");

// get all jobs
router.get("/", getJob);

// get job by id
router.get("/:id", getJobById);

// post a new job
router.post("/", requireAuth, addJob);

// put a job
router.put("/:id", requireAuth, updateJobById);

// delete a job
router.delete("/:id", requireAuth, deleteJobById);

module.exports = router