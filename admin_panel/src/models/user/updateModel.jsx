import React, { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";

const categories = ["IT", "Design", "QA", "Management"];

const UpdateModel = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    profile: "",
    email: "",
    phone: "",
    role: "User",
    category: "IT",
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profile: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2 relative">
        <h2 className="text-lg font-semibold mb-4 text-center">Update User</h2>

        {/* Profile Image at Top Center with camera icon */}
        <div className="flex justify-center mb-5 relative">
          <label htmlFor="profile-upload" className="cursor-pointer relative">
            {formData.profile ? (
              <img
                src={formData.profile}
                alt="Profile Preview"
                className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
              />
            ) : (
              <div className="w-28 h-28 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400">
                Upload
              </div>
            )}
            {/* Camera Icon */}
            <div className="absolute bottom-0 right-0 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white border-2 border-white">
              <FiCamera />
            </div>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form Inputs with gray border */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
  type="email"
  name="email"
  value={formData.email}
  readOnly
  className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed focus:outline-none"
/>
<input
  type="text"
  name="phone"
  value={formData.phone}
  readOnly
  className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed focus:outline-none"
/>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
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
            className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
