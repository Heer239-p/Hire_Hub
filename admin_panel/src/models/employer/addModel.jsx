import React, { useState } from "react";
import { FiCamera } from "react-icons/fi";

const industries = ["Technology", "Finance", "Healthcare", "Retail", "Pharmaceutical", "Education", "Manufacturing", "Other"];
const defaultProfile =
  "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"; // clean default profile icon

const AddModel = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    industry: "Technology",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImage: "Image size must be less than 5MB" });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, profileImage: "Please upload a valid image file" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
        setErrors({ ...errors, profileImage: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Company Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters";
    } else if (formData.companyName.trim().length > 100) {
      newErrors.companyName = "Company name must be less than 100 characters";
    }

    // Company Website validation (optional but must be valid if provided)
    if (formData.companyWebsite.trim()) {
      try {
        const url = new URL(formData.companyWebsite);
        if (!['http:', 'https:'].includes(url.protocol)) {
          newErrors.companyWebsite = "Website must start with http:// or https://";
        }
      } catch {
        newErrors.companyWebsite = "Please enter a valid URL (e.g., https://example.com)";
      }
    }

    // Company Description validation (optional but with max length)
    if (formData.companyDescription.trim().length > 500) {
      newErrors.companyDescription = "Description must be less than 500 characters";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Trim all string fields before submitting
    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      companyName: formData.companyName.trim(),
      companyDescription: formData.companyDescription.trim(),
      companyWebsite: formData.companyWebsite.trim(),
    };
    
    onAdd(cleanedData);
    onClose();
  };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
       <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Add Employer
        </h2>

        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profile-upload" className="cursor-pointer relative">
            <img
              src={formData.profileImage || defaultProfile}
              alt="Profile Preview"
              className={`w-32 h-32 object-cover rounded-full border-2 ${
                errors.profileImage ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            {/* Camera Icon */}
            <div className="absolute bottom-0 right-0 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border-2 border-white hover:bg-blue-600 transition">
              <FiCamera size={18} />
            </div>

            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {errors.profileImage && (
            <p className="text-red-500 text-sm mt-2">{errors.profileImage}</p>
          )}
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name Field */}
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              className={`border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className={`border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Company Name Field */}
          <div className="flex flex-col">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name *"
              value={formData.companyName}
              onChange={handleChange}
              className={`border ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>

          {/* Company Website Field */}
          <div className="flex flex-col">
            <input
              type="url"
              name="companyWebsite"
              placeholder="Company Website (e.g., https://example.com)"
              value={formData.companyWebsite}
              onChange={handleChange}
              className={`border ${
                errors.companyWebsite ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            />
            {errors.companyWebsite && (
              <p className="text-red-500 text-xs mt-1">{errors.companyWebsite}</p>
            )}
          </div>

          {/* Industry Field */}
          <div className="flex flex-col">
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Company Description Field */}
          <div className="flex flex-col md:col-span-2">
            <textarea
              name="companyDescription"
              placeholder="Company Description (optional)"
              value={formData.companyDescription}
              onChange={handleChange}
              rows="3"
              className={`border ${
                errors.companyDescription ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.companyDescription && (
                <p className="text-red-500 text-xs">{errors.companyDescription}</p>
              )}
              <p className={`text-xs ml-auto ${
                formData.companyDescription.length > 500 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {formData.companyDescription.length}/500
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-600 transition font-medium"
          >
            Add Employer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
