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
// GET APPLICANTS FOR A SPECIFIC JOB (Employer only)
// ==========================
export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Ensure only employer can access this
    if (req.user.role !== "employer") {
      return errorResponse(res, 403, "Only employers can view job applicants ❌");
    }

    // Find the job and ensure it belongs to the requesting employer
    const job = await Job.findOne({ _id: jobId, employer: req.user._id });
    if (!job) {
      return errorResponse(res, 404, "Job not found or you don't have permission to view its applicants ❌");
    }

    // Find all applications for this job with populated applicant and job details
    const applications = await Application.find({ job: jobId })
      .populate({
        path: "applicant",
        select: "firstName lastName email profileImage experienceYears currentRole skills"
      })
      .populate({
        path: "job",
        select: "title company"
      })
      .sort({ createdAt: -1 });

    // Process applications to handle skills field
    const processedApplications = applications.map(application => {
      const appObject = application.toObject();
      return {
        ...appObject,
        applicant: {
          ...appObject.applicant,
          // Convert skills string to array if it's a string
          skills: typeof appObject.applicant.skills === 'string' 
            ? appObject.applicant.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
            : appObject.applicant.skills || []
        }
      };
    });

    return successResponse(res, 200, "Applicants fetched successfully ✅", processedApplications);
  } catch (error) {
    console.error("Error fetching job applicants:", error);
    return errorResponse(res, 500, "Server error while fetching job applicants ⚠️", {
      details: error.message,
    });
  }
};

// ==========================
// GET DETAILED APPLICATION INFO (Employer only)
// ==========================
export const getApplicationDetails = async (req, res) => {
  try {
    const { id } = req.params; // Application ID
    
    // Ensure only employer can access this
    if (req.user.role !== "employer") {
      return errorResponse(res, 403, "Only employers can view application details ❌");
    }

    // Find the application with populated details
    const application = await Application.findById(id)
      .populate({
        path: "applicant",
        select: "firstName lastName email mobile profileImage experienceYears currentRole skills location"
      })
      .populate({
        path: "job",
        select: "title company location jobType"
      });

    if (!application) {
      return errorResponse(res, 404, "Application not found ❌");
    }

    // Verify that the job belongs to the requesting employer
    const job = await Job.findOne({ _id: application.job._id, employer: req.user._id });
    if (!job) {
      return errorResponse(res, 403, "You don't have permission to view this application ❌");
    }

    // Process the applicant data
    const processedApplication = {
      ...application.toObject(),
      applicant: {
        ...application.applicant.toObject(),
        // Convert skills string to array if it's a string
        skills: typeof application.applicant.skills === 'string' 
          ? application.applicant.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
          : application.applicant.skills || []
      }
    };

    return successResponse(res, 200, "Application details fetched successfully ✅", processedApplication);
  } catch (error) {
    console.error("Error fetching application details:", error);
    return errorResponse(res, 500, "Server error while fetching application details ⚠️", {
      details: error.message,
    });
  }
};

// ==========================
// GET ALL APPLICATIONS FOR LOGGED-IN USER
// ==========================
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await Application.find({ applicant: userId })
      .populate("job", "title company location salary jobType image")
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

    // Verify that the job belongs to the requesting employer (if not admin)
    if (req.user.role === "employer") {
      const job = await Job.findOne({ _id: application.job._id, employer: req.user._id });
      if (!job) {
        return errorResponse(res, 403, "You don't have permission to update this application");
      }
    }

    application.status = status;
    await application.save();

    // Process the response to handle skills field
    const applicationObject = application.toObject();
    const processedApplication = {
      ...applicationObject,
      applicant: {
        ...applicationObject.applicant,
        // Convert skills string to array if it's a string
        skills: typeof applicationObject.applicant.skills === 'string' 
          ? applicationObject.applicant.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
          : applicationObject.applicant.skills || []
      }
    };

    return successResponse(res, 200, "Application status updated successfully", processedApplication);
  } catch (error) {
    console.error("Error updating application status:", error);
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