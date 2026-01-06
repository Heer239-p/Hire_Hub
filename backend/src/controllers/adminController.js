import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// ==========================
// USERS
// ==========================

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ status: "success", statusCode: 200, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ status: "error", statusCode: 404, message: "User not found" });
    res.json({ status: "success", statusCode: 200, data: user });
  } catch (error) {
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!user) return res.status(404).json({ status: "error", statusCode: 404, message: "User not found" });
    res.json({ status: "success", statusCode: 200, message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: "success", statusCode: 200, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};

// ==========================
// JOBS
// ==========================

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer", "firstName lastName email role");
    res.json({ status: "success", statusCode: 200, data: jobs });
  } catch (error) {
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};

// Get single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("employer", "firstName lastName email role");
    if (!job) return res.status(404).json({ status: "error", statusCode: 404, message: "Job not found" });
    res.json({ status: "success", statusCode: 200, data: job });
  } catch (error) {
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};

// Update job by ID
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ status: "error", statusCode: 404, message: "Job not found" });
    res.json({ status: "success", statusCode: 200, message: "Job updated successfully", data: job });
  } catch (error) {
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};

// Delete job by ID
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ status: "error", statusCode: 404, message: "Job not found" });
    res.json({ status: "success", statusCode: 200, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", statusCode: 500, message: error.message });
  }
};


export const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.body;
    
    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { status: { $regex: search, $options: "i" } },
          { "job.title": { $regex: search, $options: "i" } },
          { "applicant.firstName": { $regex: search, $options: "i" } },
          { "applicant.lastName": { $regex: search, $options: "i" } },
          { "applicant.email": { $regex: search, $options: "i" } }
        ]
      };
    }

    // Get total count for pagination
    const totalCount = await Application.countDocuments(searchQuery);

    // Get applications with pagination
    const applications = await Application.find(searchQuery)
      .populate("job", "title")                // only job title
      .populate("applicant", "firstName lastName email")     // only name + email
      .select("status createdAt")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const formatted = applications.map(app => ({
      _id: app._id,
      jobTitle: app.job?.title,
      applicant: `${app.applicant?.firstName || ''} ${app.applicant?.lastName || ''}`.trim() || "N/A",
      email: app.applicant?.email,
      status: app.status,
      appliedOn: app.createdAt
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      total: totalCount,
      data: formatted,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete application by ID
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the application
    const application = await Application.findByIdAndDelete(id);
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: "Application not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Application deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};


import Payment from "../models/Payment.js";

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("employer", "firstName lastName email")  // only name, email
      .populate("job", "title")            // only job title
      .sort({ createdAt: -1 });            // latest first


    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};