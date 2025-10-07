import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "user",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null, // New field
  });

  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-indigo-100 to-blue-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black-600">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join HireHub and start your career journey
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-md"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L14 2.586A2 2 0 0012.586 2H4zm7 5a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Upload your profile picture
            </p>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="user">User</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Email & Mobile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-gray-300 w-1/3"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-300 w-1/3"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded-xl hover:bg-gray-100 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>

          <button className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded-xl hover:bg-gray-100 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">LinkedIn</span>
          </button>
        </div>

        {/* Login Redirect */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
