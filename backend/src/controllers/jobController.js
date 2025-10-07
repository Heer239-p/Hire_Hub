import Job from "../models/Job.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Admin or Employer)
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

    // Validate required fields
    if (!title || !description) {
      return errorResponse(res, 400, "Title and Description are required");
    }

    const job = await Job.create({
      title,
      description,
      company: company || "Unknown Company",
      location: location || "Remote",
      salary: salary || "",
      jobType: jobType || "Full-Time",
      skills: skills || [],
      deadline: deadline || null,
      employer: req.user._id, // auto-assign logged-in user as employer
    });

    return successResponse(res, 201, "Job created successfully ✅", job);
  } catch (error) {
    return errorResponse(res, 500, "Server error while creating job", { details: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    // 1. Build filter object from query parameters
    const filter = {};

    if (req.query.location) filter.location = req.query.location;
    if (req.query.jobType) filter.jobType = req.query.jobType;
    if (req.query.company) filter.company = req.query.company;
    if (req.query.skill) filter.skills = { $in: [req.query.skill] }; // search skill in skills array

    // 2. Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 3. Fetch jobs from DB
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate("employer", "firstName lastName email role"); // optional: show employer info

    // 4. Total jobs count for frontend pagination
    const totalJobs = await Job.countDocuments(filter);

    return successResponse(res, 200, "Jobs fetched successfully ✅", {
      jobs,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    return errorResponse(res, 500, "Server error while fetching jobs", { details: error.message });
  }
};

//update job - only by admin or the employer who posted it
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return errorResponse(res, 404, "Job not found ❌");
    }

    // Only admin or the employer who posted the job can update
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

    // Update fields if provided
    job.title = title || job.title;
    job.description = description || job.description;
    job.company = company || job.company;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.jobType = jobType || job.jobType;
    job.skills = skills || job.skills;
    job.deadline = deadline || job.deadline;

    const updatedJob = await job.save();

    return successResponse(res, 200, "Job updated successfully ✅", updatedJob);
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Server error while updating job",
      { details: error.message }
    );
  }
};

//delete job - only by admin or the employer who posted it
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return errorResponse(res, 404, "Job not found ❌");
    }

    // Only admin or the employer who posted the job can delete
    if (
      req.user.role !== "admin" &&
      job.employer.toString() !== req.user._id.toString()
    ) {
      return errorResponse(res, 403, "Access denied ❌");
    }

    await job.deleteOne();

    return successResponse(res, 200, "Job deleted successfully ✅");
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Server error while deleting job",
      { details: error.message }
    );
  }
};