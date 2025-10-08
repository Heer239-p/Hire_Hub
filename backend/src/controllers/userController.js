import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";


// ====================================================
// UPDATE USER PROFILE (Job Seeker or Employer)
// ====================================================
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, "User not found ❌");

    // Basic fields
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.mobile = req.body.mobile || user.mobile;
    user.email = req.body.email || user.email;

    // Optional profile image upload
    if (req.file) {
      user.profileImage = req.file.filename;
    }

    // Update password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // If role is employer, allow company updates
    if (user.role === "employer") {
      user.companyName = req.body.companyName || user.companyName || "Unknown Company";
      user.companyWebsite = req.body.companyWebsite || user.companyWebsite || "";
      user.companyDescription = req.body.companyDescription || user.companyDescription || "";
      user.industry = req.body.industry || user.industry || "";
    } else {
      // If a normal user tries to send company fields, block them
      if (req.body.companyName || req.body.companyWebsite || req.body.companyDescription || req.body.industry) {
        return errorResponse(res, 400, "Only employers can update company details ❌");
      }
    }

    const updatedUser = await user.save();

    return successResponse(res, 200, "Profile updated successfully ✅", {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      mobile: updatedUser.mobile,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage || null,
      companyName: updatedUser.companyName || null,
      companyWebsite: updatedUser.companyWebsite || null,
      companyDescription: updatedUser.companyDescription || null,
      industry: updatedUser.industry || null,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Server error while updating profile ⚠️", {
      details: error.message,
    });
  }
};





// ====================================================
// APPLY TO A JOB (Job Seekers only)
// ====================================================
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;
    const { coverLetter } = req.body;
    const resumeFile = req.file ? req.file.filename : null; // uploaded resume (PDF, DOCX)

    // Validate resume
    if (!resumeFile) {
      return errorResponse(res, 400, "Resume file is required ❌");
    }

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) return errorResponse(res, 404, "Job not found ❌");

    // Check if employer applying to own job
    if (job.employer.toString() === userId.toString()) {
      return errorResponse(res, 400, "You cannot apply to your own job ❌");
    }

    // Ensure only job seekers can apply
    const user = await User.findById(userId);
    if (user.role !== "user") {
      return errorResponse(res, 403, "Only job seekers can apply for jobs ❌");
    }

    // Prevent duplicate application
    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });
    if (alreadyApplied) {
      return errorResponse(res, 400, "You have already applied to this job ✅");
    }

    // Create new application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: resumeFile,
      coverLetter: coverLetter || "",
      status: "Applied",
    });

    // Also push applicant to job (optional, for quick lookup)
    job.applicants.push(userId);
    await job.save();

    return successResponse(res, 201, "Job applied successfully ✅", {
      applicationId: application._id,
      job: jobId,
      applicant: userId,
      resume: resumeFile,
      coverLetter: coverLetter || "",
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    return errorResponse(res, 500, "Server error while applying to job ⚠️", {
      details: error.message,
    });
  }
};
