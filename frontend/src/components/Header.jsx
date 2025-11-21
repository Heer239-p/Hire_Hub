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
  { label: "Subscription", to: "/company/subscription" },
];

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const user = useAuthUser();

  const isLoggedIn = !!user;
  const isEmployer = user?.role === "employer";

  // Handle initials
  const avatarInitials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0]?.toUpperCase())
        .join("")
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
            <div className="inline-flex items-center gap-3">

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition"
              >
                Logout
              </button>

              {/* Profile */}
              <button
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-semibold"
              >
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{avatarInitials}</span>
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
