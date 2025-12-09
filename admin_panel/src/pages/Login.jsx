import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin, isAdminAuthenticated } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAdmin(email, password);

      if (res.token) {
        navigate("/", { replace: true }); // Redirect to dashboard
      }
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with logo */}
      <div className="flex-1 flex items-center justify-center bg-[#0e252c] border-r border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-20 relative">
            <div
              className="absolute top-0 left-0 w-8 h-14 rounded-l-full"
              style={{
                background: "linear-gradient(135deg, #ff5f2e 0%, #ffbf00 100%)",
              }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-8 h-14 rounded-r-full"
              style={{
                background: "linear-gradient(135deg, #00796b 0%, #004d40 100%)",
              }}
            ></div>
          </div>
          <span className="text-white text-2xl font-light tracking-wide">
            Hire <span className="font-semibold">Hub</span>
          </span>
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex-1 flex flex-col justify-center px-24 bg-[#0e252c] text-white">
        <h2 className="text-xl mb-6 font-light">Welcome</h2>
        <p className="text-xs mb-10 font-thin tracking-widest">
          PLEASE LOGIN TO ADMIN DASHBOARD.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 rounded border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-orange-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-orange-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 rounded text-white font-semibold tracking-wide hover:bg-orange-700 transition"
          >
            LOGIN
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-400 cursor-pointer hover:underline">
          FORGOTTEN YOUR PASSWORD?
        </p>
      </div>
    </div>
  );
};

export default Login;
