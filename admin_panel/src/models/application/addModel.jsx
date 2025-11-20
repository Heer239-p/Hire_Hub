import React, { useState } from "react";

const AddModel = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    applicant: "",
    email: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.jobTitle || !formData.applicant || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    await onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl relative border border-gray-100">
         <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Application</h2>
        <div className="space-y-3">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="text"
            name="applicant"
            placeholder="Applicant Name"
            value={formData.applicant}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Applicant Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-blue-400"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-blue-400"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
