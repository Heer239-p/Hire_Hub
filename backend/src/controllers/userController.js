import User from "../models/User.js";
import Job from "../models/Job.js";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// @desc    Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.mobile = req.body.mobile || user.mobile;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
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
    });
  } catch (error) {
    return errorResponse(res, 500, "Server error while updating profile", { details: error.message });
  }
};

//apply to a job - only by authenticated users (job seekers)
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    const job = await Job.findById(jobId);

    if (!job) {
      return errorResponse(res, 404, "Job not found ❌");
    }

    // Prevent the employer from applying to their own job
    if (job.employer.toString() === userId.toString()) {
      return errorResponse(res, 400, "You cannot apply to your own job ❌");
    }

    // Prevent duplicate applications
    if (job.applicants.includes(userId)) {
      return errorResponse(res, 400, "You have already applied to this job ✅");
    }

    // Add applicant
    job.applicants.push(userId);
    await job.save();

    return successResponse(res, 200, "Applied to job successfully ✅", job);
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Server error while applying to job",
      { details: error.message }
    );
  }
};

