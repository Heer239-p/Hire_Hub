import React, { useState } from "react";
import { FiCamera } from "react-icons/fi";

const categories = ["IT", "Design", "QA", "Management"];
const defaultProfile =
  "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"; // clean default profile icon

const AddModel = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    profile: "", // image or default
    email: "",
    phone: "",
    role: "User",
    category: "IT",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, profile: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }
    await onAdd(formData);
    console.log("User added:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 md:w-1/2 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center">
          Add User
        </h2>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-5 relative">
          <label htmlFor="profile-upload" className="cursor-pointer relative">
            <img
              src={formData.profile || defaultProfile}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
            />

            {/* Camera Icon */}
            <div className="absolute bottom-0 right-0 bg-gray-500 dark:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-800">
              <FiCamera size={16} />
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

        {/* Form Inputs */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
