import User from "../models/User.js";
import Job from "../models/Job.js";

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
