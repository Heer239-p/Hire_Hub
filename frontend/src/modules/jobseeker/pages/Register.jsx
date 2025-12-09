import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/services/api/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff ,FiCamera } from "react-icons/fi";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "user",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Mobile validation
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) payload.append(key, formData[key]);
      });

      const { data } = await registerUser(payload);
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.dispatchEvent(new Event("authChange"));

      toast.success("Registration successful!");
       setTimeout(() => {
    navigate("/login");
  }, 1200);
      navigate((data.role || formData.role) === "employer" ? "/company/dashboard" : "/");
    } catch (error) {
      
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-indigo-100 to-blue-50 p-6">
      <ToastContainer />
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black-600">Create Account</h1>
          <p className="text-gray-500 mt-2">Join HireHub and start your career journey</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={preview || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-md"
              />
              
<label
  htmlFor="profileImage"
  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 flex items-center justify-center"
>
  <FiCamera className="w-5 h-5" />
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
            <p className="text-sm text-gray-500 mt-2">Upload your profile picture</p>
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Name, Email, Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
