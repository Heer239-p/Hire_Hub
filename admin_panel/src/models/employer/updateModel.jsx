import React, { useState, useEffect } from "react";

const UpdateModel = ({ employer, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    industry: "",
  });

  useEffect(() => {
    if (employer) setFormData(employer);
  }, [employer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  if (!employer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Update Employer</h2>
        <div className="space-y-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <textarea name="companyDescription" value={formData.companyDescription} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"/>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600">Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
