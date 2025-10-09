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

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add Application</h2>
        <div className="space-y-3">
          <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="applicant" placeholder="Applicant Name" value={formData.applicant} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="email" name="email" placeholder="Applicant Email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg">
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
