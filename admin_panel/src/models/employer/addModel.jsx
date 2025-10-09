import React, { useState } from "react";

const AddModel = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    industry: "",
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
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Add Employer</h2>
        <div className="space-y-3">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="profileImage" placeholder="Profile Image URL" value={formData.profileImage} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <textarea name="companyDescription" placeholder="Company Description" value={formData.companyDescription} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="companyWebsite" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
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
