import User from "../models/User.js";
import Job from "../models/Job.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("employer", "email");
  res.json(jobs);
};
