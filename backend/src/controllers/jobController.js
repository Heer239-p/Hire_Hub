import Job from "../models/Job.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// ==========================
// CREATE JOB (with optional file upload)
// ==========================
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      skills,
      deadline,
    } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // Validate required fields
    if (!title || !description) {
      return errorResponse(res, 400, "Title and Description are required ❌");
    }

    // Handle uploaded file (if any)
    const jobFile = req.file ? req.file.filename : null;

    const job = await Job.create({
      title,
      description,
      company: company || "Unknown Company",
      location: location || "Remote",
      salary: salary || "",
      jobType: jobType || "Full-Time",
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      deadline: deadline || null,
      employer: req.user._id,
      attachment: jobFile || null, // file field in model
    });

    return successResponse(res, 201, "Job created successfully ✅", job);
  } catch (error) {
    console.error("Error creating job:", error);
    return errorResponse(res, 500, "Server error while creating job ⚠️", {
      details: error.message,
    });
  }
};

// ==========================
// GET ALL JOBS (with filters + pagination)
// ==========================
export const getAllJobs = async (req, res) => {
  try {
    const filter = {};

    if (req.query.location) filter.location = req.query.location;
    if (req.query.jobType) filter.jobType = req.query.jobType;
    if (req.query.company) filter.company = req.query.company;
    if (req.query.skill) filter.skills = { $in: [req.query.skill] };

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("employer", "firstName lastName email role");

    const totalJobs = await Job.countDocuments(filter);

    return successResponse(res, 200, "Jobs fetched successfully ✅", {
      jobs,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return errorResponse(res, 500, "Server error while fetching jobs ⚠️", {
      details: error.message,
    });
  }
};

// ==========================
// UPDATE JOB
// ==========================
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) return errorResponse(res, 404, "Job not found ❌");

    // Permission check
    if (
      req.user.role !== "admin" &&
      job.employer.toString() !== req.user._id.toString()
    ) {
      return errorResponse(res, 403, "Access denied ❌");
    }

    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      skills,
      deadline,
    } = req.body;

    // Update fields
    job.title = title || job.title;
    job.description = description || job.description;
    job.company = company || job.company;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.jobType = jobType || job.jobType;
    job.skills = skills
      ? skills.split(",").map((s) => s.trim())
      : job.skills;
    job.deadline = deadline || job.deadline;

    // Update file if provided
    if (req.file) {
      job.attachment = req.file.filename;
    }

    const updatedJob = await job.save();

    return successResponse(res, 200, "Job updated successfully ✅", updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return errorResponse(res, 500, "Server error while updating job ⚠️", {
      details: error.message,
    });
  }
};

// ==========================
// DELETE JOB
// ==========================
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) return errorResponse(res, 404, "Job not found ❌");

    if (
      req.user.role !== "admin" &&
      job.employer.toString() !== req.user._id.toString()
    ) {
      return errorResponse(res, 403, "Access denied ❌");
    }

    await job.deleteOne();

    return successResponse(res, 200, "Job deleted successfully ✅");
  } catch (error) {
    console.error("Error deleting job:", error);
    return errorResponse(res, 500, "Server error while deleting job ⚠️", {
      details: error.message,
    });
  }
};
