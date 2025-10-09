import React, { useState } from "react";
import { FiCamera } from "react-icons/fi";

const industries = ["IT", "Design", "QA", "Management"];
const defaultLogo =
  "https://www.pikpng.com/pngl/b/66-660381_business-icon-company-name-icon-clipart.png"; // default company logo

const AddModel = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "IT",
    website: "",
    description: "",
    logo: "", // image or default
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          Add Company
        </h2>

        {/* Logo / Image Section */}
        <div className="flex justify-center mb-5 relative">
          <label htmlFor="logo-upload" className="cursor-pointer relative">
            <img
              src={formData.logo || defaultLogo}
              alt="Company Logo"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />

            <div className="absolute bottom-0 right-0 bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
              <FiCamera size={16} />
            </div>

            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex justify-end gap-2">
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
