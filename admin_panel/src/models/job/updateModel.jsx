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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-150">
        <h2 className="text-xl font-semibold mb-4">Update Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" placeholder="Title" value={jobData.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="company" placeholder="Company" value={jobData.company} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="category" placeholder="Category" value={jobData.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="location" placeholder="Location" value={jobData.location} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="type" placeholder="Type" value={jobData.type} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="date" name="postedDate" value={jobData.postedDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="date" name="expiryDate" value={jobData.expiryDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
