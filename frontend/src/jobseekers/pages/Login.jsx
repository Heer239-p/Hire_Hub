import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login successful!");
      navigate("/"); // redirect after login
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-indigo-100 to-blue-50 p-6">
  <ToastContainer />
  <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-gray-200">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Hire Hub Login</h1>
    <form onSubmit={handleLogin} className="space-y-5">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 text-gray-700"
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 text-gray-700"
          required
        />
        <span
          className="absolute right-4 top-3 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition duration-200"
      >
        Login
      </button>
    </form>
    <p className="text-center text-sm text-gray-500 mt-4">
      Don't have an account?{" "}
      <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate("/signup")}>
        Sign Up
      </span>
    </p>
  </div>
</section>

  );
};

export default Login;
