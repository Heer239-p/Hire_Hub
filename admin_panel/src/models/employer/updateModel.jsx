import React, { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";

const industries = ["IT", "Finance", "Healthcare", "Education", "Other"];
const companyTypes = ["Full-time", "Part-time"];

const UpdateModel = ({ employer, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    industry: "IT",
    companyType: "Full-time",
  });

  useEffect(() => {
    if (employer) setFormData(employer);
  }, [employer]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, profileImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!employer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-11/12 md:w-2/3 max-w-2xl border border-gray-200 relative">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Update Employer
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6 relative">
          <label htmlFor="update-profile-upload" className="cursor-pointer relative">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                Profile
              </div>
            )}

            {/* Camera Icon (bottom-right corner) */}
            <div className="absolute -bottom-2 right-2 bg-gray-100 p-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-200 transition">
              <FiCamera size={18} className="text-gray-700" />
            </div>

            <input
              id="update-profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Contact Person Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="companyWebsite"
            placeholder="Company Website"
            value={formData.companyWebsite}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </form>

        {/* Company Description */}
        <textarea
          name="companyDescription"
          placeholder="Company Description"
          value={formData.companyDescription}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2.5 rounded-lg mt-4 h-28 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
