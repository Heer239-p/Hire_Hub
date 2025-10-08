import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";

import { successResponse, errorResponse } from "../utils/responseHandler.js";

// ====================================================
// GET ALL APPLICATIONS FOR EMPLOYER'S JOBS
// ====================================================
export const getMyJobApplications = async (req, res) => {
  try {
    // Ensure only employer can access this
    if (req.user.role !== "employer") {
      return errorResponse(res, 403, "Only employers can view job applications ❌");
    }

    // Find all jobs posted by this employer
    const jobs = await Job.find({ employer: req.user._id })
      .populate({
        path: "applicants",
        select: "firstName lastName email profileImage resume", // optional fields from user
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return errorResponse(res, 404, "No jobs found for this employer ❌");
    }

    // Return job + applicants
    return successResponse(res, 200, "Applications fetched successfully ✅", jobs);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return errorResponse(res, 500, "Server error while fetching applications ⚠️", {
      details: error.message,
    });
  }
};

// ==========================
// UPDATE APPLICATION STATUS (Admin/Employer)
// ==========================
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params; // Application ID
    let { status } = req.body;

    // Capitalize first letter to match enum
    status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    const allowedStatuses = ["Applied", "Reviewed", "Shortlisted", "Rejected", "Hired"];
    if (!allowedStatuses.includes(status)) {
      return errorResponse(res, 400, "Invalid status value");
    }

    const application = await Application.findById(id).populate("applicant job");
    if (!application) {
      return errorResponse(res, 404, "Application not found");
    }

    // Only admin or employer should be able to update
    if (req.user.role !== "admin" && req.user.role !== "employer") {
      return errorResponse(res, 403, "Unauthorized: Access denied");
    }

    application.status = status;
    await application.save();

    return successResponse(res, 200, "Application status updated successfully", application);
  } catch (error) {
    console.error("Error updating application status:", error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

// ==========================
// GET ALL APPLICATIONS FOR LOGGED-IN USER
// ==========================
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await Application.find({ applicant: userId })
      .populate("job", "title company location salary jobType")
      .sort({ createdAt: -1 });

    if (!applications.length) {
      return errorResponse(res, 404, "No applications found for this user");
    }

    return successResponse(res, 200, "User applications fetched successfully", applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

// ==========================
// WITHDRAW APPLICATION (User only)
// ==========================
export const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params; // Application ID
    const userId = req.user._id;

    // Find the application
    const application = await Application.findById(id);
    if (!application) {
      return errorResponse(res, 404, "Application not found");
    }

    // Ensure only the applicant can withdraw
    if (application.applicant.toString() !== userId.toString()) {
      return errorResponse(res, 403, "Unauthorized: You can only withdraw your own application");
    }

    await application.deleteOne();

    return successResponse(res, 200, "Application withdrawn successfully");
  } catch (error) {
    console.error("Error withdrawing application:", error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};