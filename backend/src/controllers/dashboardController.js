import Job from "../models/Job.js";
import Application from "../models/Application.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// ==========================
// GET EMPLOYER DASHBOARD STATS
// ==========================
export const getEmployerDashboardStats = async (req, res) => {
  try {
    const employerId = req.user._id;

    // Get total jobs count
    const totalJobs = await Job.countDocuments({ employer: employerId });

    // Get active jobs count
    const activeJobs = await Job.countDocuments({ 
      employer: employerId, 
      status: "Active" 
    });

    // Get total applications across all jobs
    // First get all job IDs for this employer
    const employerJobs = await Job.find({ employer: employerId }, '_id');
    const jobIds = employerJobs.map(job => job._id);

    const totalApplications = await Application.countDocuments({ 
      job: { $in: jobIds } 
    });

    // Get applications by status
    const statusCounts = {};
    const statuses = ["Applied", "Reviewed", "Shortlisted", "Rejected", "Hired"];
    
    for (const status of statuses) {
      statusCounts[status] = await Application.countDocuments({ 
        job: { $in: jobIds },
        status: status
      });
    }

    // Get recent jobs (last 5)
    const recentJobs = await Job.find({ employer: employerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt applicants');

    // Add applicant count to each job
    const jobsWithApplicantCount = await Promise.all(recentJobs.map(async (job) => {
      const applicantCount = await Application.countDocuments({ job: job._id });
      return {
        ...job.toObject(),
        applicantCount
      };
    }));

    // Return dashboard data
    return successResponse(res, 200, "Dashboard stats fetched successfully", {
      stats: {
        totalJobs,
        activeJobs,
        totalApplications,
        statusCounts
      },
      recentJobs: jobsWithApplicantCount
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return errorResponse(res, 500, "Server error while fetching dashboard stats", {
      details: error.message,
    });
  }
};