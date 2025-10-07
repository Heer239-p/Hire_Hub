import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 md:px-0 py-16">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black-600">HireHub Login</h1>
          <p className="text-gray-600 mt-2">
            Log in to find your dream job or manage your applications
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-between mt-6 text-sm text-gray-600">
          <Link to="/signup" className="hover:text-blue-600 font-medium">
            Create Account
          </Link>
          <Link to="/forgot-password" className="hover:text-blue-600 font-medium">
            Forgot Password?
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-xs">
          © 2025 HireHub. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Login;
