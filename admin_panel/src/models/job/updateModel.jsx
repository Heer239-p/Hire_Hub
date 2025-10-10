import React, { useState } from "react";

const UpdateModel = ({ job, onClose, onUpdate }) => {
  const [jobData, setJobData] = useState(job);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(jobData);
    onClose();
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl relative border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Update Job
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

          {/* Type */}
          <select
            name="type"
            value={jobData.type}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Status */}
          <select
            name="status"
            value={jobData.status || "Active"}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Posted Date */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1">Posted Date</label>
            <input
              type="date"
              name="postedDate"
              value={jobData.postedDate}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={jobData.expiryDate}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Action Buttons - full width */}
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
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
