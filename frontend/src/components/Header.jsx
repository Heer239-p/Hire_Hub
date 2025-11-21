import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import useAuthUser from "../hooks/useAuthUser";

const userLinks = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "/jobs" },
  { label: "Candidates", to: "/candidates" },
  { label: "My Application", to: "/userapplications" },
  { label: "Get in Touch & Review", to: "/contact" },
];

const employerLinks = [
  { label: "Dashboard", to: "/company/dashboard" },
  { label: "Post Job", to: "/company/post-job" },
  { label: "Manage Jobs", to: "/company/manage-jobs" },
  { label: "Applicants", to: "/company/applicants" },
];

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const user = useAuthUser();
  const isLoggedIn = !!user;
  const isEmployer = user?.role === "employer";

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(() => (isEmployer ? employerLinks : userLinks), [isEmployer]);

  // Logout handler
  const handleLogout = async () => {
    try {
      if (user?.token) {
        try {
          await logoutUser(user.token);
        } catch (error) {
          console.warn("Logout API failed; falling back to client logout", error);
        }
      }

      localStorage.removeItem("userInfo");
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scroll ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold tracking-wide transition ${
            scroll ? "text-white" : "text-white"
          }`}
        >
          Hire<span className="text-blue-400">Hub</span>
        </Link>

        {/* Navigation */}
        <nav
          className={`hidden md:flex space-x-10 font-medium transition ${
            scroll ? "text-white" : "text-white"
          }`}
        >
          {navLinks.map((link) => (
            <Link key={link.to} className="hover:text-blue-400 transition" to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-md transition ${
                  scroll
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-transparent text-white hover:bg-white hover:text-black"
                }`}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md transition ${
                  scroll
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {isEmployer ? (
                <Link
                  to="/company/dashboard"
                  className={`px-4 py-2 rounded-md transition ${
                    scroll
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Employer Hub
                </Link>
              ) : (
                <Link
                  to="/userapplications"
                  className={`px-4 py-2 rounded-md transition ${
                    scroll
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                  }`}
                >
                  My Space
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-md transition ${
                  scroll
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
