import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";


// ====================================================
// GET USER PROFILE
// ====================================================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return errorResponse(res, 404, "User not found ❌");

    return successResponse(res, 200, "Profile fetched successfully ✅", {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage || null,
      location: user.location || null,
      experienceYears: user.experienceYears || null,
      currentRole: user.currentRole || null,
      skills: user.skills || null,
      linkedin: user.linkedin || null,
      portfolio: user.portfolio || null,
      companyName: user.companyName || null,
      companyWebsite: user.companyWebsite || null,
      companyDescription: user.companyDescription || null,
      industry: user.industry || null,
      companySize: user.companySize || null,
      foundedYear: user.foundedYear || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Server error while fetching profile ⚠️", {
      details: error.message,
    });
  }
};


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
    user.location = req.body.location || user.location;
    user.experienceYears = req.body.experienceYears || user.experienceYears;
    user.currentRole = req.body.currentRole || user.currentRole;
    user.skills = req.body.skills || user.skills;
    user.linkedin = req.body.linkedin || user.linkedin;
    user.portfolio = req.body.portfolio || user.portfolio;

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
      user.companySize = req.body.companySize || user.companySize || "";
      user.foundedYear = req.body.foundedYear || user.foundedYear || "";
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
      location: updatedUser.location || null,
      experienceYears: updatedUser.experienceYears || null,
      currentRole: updatedUser.currentRole || null,
      skills: updatedUser.skills || null,
      linkedin: updatedUser.linkedin || null,
      portfolio: updatedUser.portfolio || null,
      companyName: updatedUser.companyName || null,
      companyWebsite: updatedUser.companyWebsite || null,
      companyDescription: updatedUser.companyDescription || null,
      industry: updatedUser.industry || null,
      companySize: updatedUser.companySize || null,
      foundedYear: updatedUser.foundedYear || null,
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
    // Defensive checks
    if (!req.user) {
      return errorResponse(res, 401, "Authentication required. Please log in to apply for jobs.");
    }
    
    const jobId = req.params.id;
    const userId = req.user._id;
    const { coverLetter } = req.body;

    // Validate job ID
    if (!jobId) {
      return errorResponse(res, 400, "Job ID is required");
    }

    // Resume required
    if (!req.file) {
      return errorResponse(res, 400, "Resume file is required ❌");
    }

    const resumeFile = req.file.filename;

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) return errorResponse(res, 404, "Job not found ❌");

    // Prevent employer applying to own job
    if (job.employer.toString() === userId.toString()) {
      return errorResponse(res, 400, "You cannot apply to your own job ❌");
    }

    // Only normal user can apply
    const user = await User.findById(userId);
    if (user.role !== "user") {
      return errorResponse(res, 403, "Only job seekers can apply for jobs ❌");
    }

    // Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return errorResponse(res, 400, "You have already applied to this job ❌");
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: resumeFile,
      coverLetter: coverLetter || "",
      status: "Applied",
    });

    // Add applicant to job applicants list
    job.applicants.push(userId);
    await job.save();

    return successResponse(res, 201, "Job applied successfully ✅", {
      applicationId: application._id,
      job: jobId,
      applicant: userId,
      resume: resumeFile,
      coverLetter: coverLetter || "",
      status: "Applied",
    });

  } catch (error) {
    console.error("Error applying to job:", error);
    return errorResponse(res, 500, "Server error while applying to job ⚠️", {
      details: error.message,
    });
  }
};




// ==========================
// GET ONLY CANDIDATES (role=user)
// ==========================
export const getOnlyUsers = async (req, res) => {
  try {
    // Fetch only users with role="user", exclude password
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ status: "success", statusCode: 200, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};