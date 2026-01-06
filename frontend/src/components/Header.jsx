import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import useAuthUser from "../hooks/useAuthUser";

const userLinks = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "/jobs" },
  { label: "Candidates", to: "/candidates" },
  { label: "My Applications", to: "/userapplications" },
  { label: "Contact & Reviews", to: "/contact" },
];

const employerLinks = [
  { label: "Dashboard", to: "/company/dashboard" },
  { label: "Post Job", to: "/company/post-job" },
  { label: "Manage Jobs", to: "/company/manage-jobs" },
  { label: "Subscription", to: "/company/subscription" },
];

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const user = useAuthUser();

  const isLoggedIn = !!user;
  const isEmployer = user?.role === "employer";

  // Handle initials
  const avatarInitials = user?.firstName || user?.name
    ? (user.firstName?.[0] || user.name?.[0] || "U").toUpperCase()
    : "U";

  // FIX: use backend URL for image path
  const profileImageUrl = user?.profileImage
    ? `http://localhost:5000/uploads/${user.profileImage}`
    : null;

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(() => (isEmployer ? employerLinks : userLinks), [isEmployer]);

  const handleLogout = async () => {
    try {
      if (user?.token) {
        try {
          await logoutUser(user.token);
        } catch (error) {
          console.warn("Logout API failed, local logout", error);
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
        scroll ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <span
            className={`text-2xl font-bold tracking-tight transition ${
              scroll ? "text-gray-900" : "text-white"
            }`}
          >
            Hire<span className="text-blue-500">Hub</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav
          className={`hidden md:flex space-x-8 font-medium transition ${
            scroll ? "text-gray-700" : "text-white"
          }`}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              className="hover:text-blue-500 transition py-2 relative group" 
              to={link.to}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-3 hidden md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className={`px-5 py-2 rounded-full transition font-medium text-sm ${
                  scroll
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                    : "bg-white text-blue-600 hover:bg-gray-100 shadow-md"
                }`}
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className={`px-5 py-2 rounded-full transition font-medium text-sm ${
                  scroll
                    ? "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 shadow-sm"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                }`}
              >
                Login
              </Link>
            </>
          ) : (
            <div className="inline-flex items-center gap-3">
              {/* Logout */}
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition font-medium text-sm ${
                  scroll
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </button>

              {/* Profile */}
              <button
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-sm font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
              >
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = `<span className="flex items-center justify-center">${avatarInitials}</span>`;
                    }}
                  />
                ) : (
                  <span className="flex items-center justify-center text-white">
                    {avatarInitials}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;