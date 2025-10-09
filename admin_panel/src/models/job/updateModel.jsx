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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Job</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
          <input
            name="title"
            placeholder="Title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            name="company"
            placeholder="Company"
            value={jobData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Dropdown for Category */}
          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="IT">IT</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* Dropdown for Type */}
          <select
            name="type"
            value={jobData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Dates side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Posted Date</label>
              <input
                type="date"
                name="postedDate"
                value={jobData.postedDate}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={jobData.expiryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
