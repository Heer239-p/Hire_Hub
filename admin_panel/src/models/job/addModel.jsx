import React, { useState } from "react";

const AddModel = ({ onClose, onAdd }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    category: "IT", // default value
    location: "",
    jobType: "Full-time", // default value
    salary: "",
    applicants: 0,
    status: "Active",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!jobData.title || !jobData.company || !jobData.location) {
      alert("Please fill in all required fields (Title, Company, Location)");
      return;
    }
    
    await onAdd(jobData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl relative border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Add Job
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <input
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Description */}
          <input
            name="description"
            placeholder="Description"
            value={jobData.description}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Company */}
          <input
            name="company"
            placeholder="Company"
            value={jobData.company}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Category */}
          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="IT">IT</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
          </select>

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Job Type */}
          <select
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Salary */}
          <input
            name="salary"
            placeholder="Salary"
            value={jobData.salary}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Status */}
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Applicants */}
          <input
            type="number"
            name="applicants"
            placeholder="Applicants"
            value={jobData.applicants}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Action Buttons - full width row */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModel;