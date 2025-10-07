import Job from "../models/Job.js";

// Create Job (Employer/Admin)
export const createJob = async (req, res) => {
  const { title, description, company, location, salary } = req.body;

  try {
    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      employer: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("employer", "firstName lastName email");
  res.json(jobs);
};
