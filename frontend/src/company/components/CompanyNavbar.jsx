import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import { logoutUser } from "../../api/authApi";

const navLinks = [
  { label: "Dashboard", to: "/company/dashboard" },
  { label: "Post Job", to: "/company/post-job" },
  { label: "Manage Jobs", to: "/company/manage-jobs" },
  { label: "Applicants", to: "/company/applicants" },
  { label: "Profile", to: "/company/profile" },
];

const CompanyNavbar = () => {
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthUser();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLinks = useMemo(() => navLinks, []);

  const handleLogout = async () => {
    const token = user?.token;

    if (token) {
      try {
        await logoutUser(token);
      } catch (error) {
        console.warn("Employer logout failed, clearing session anyway", error);
      }
    }

    localStorage.removeItem("userInfo");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scroll ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/company/dashboard"
          className={`text-2xl font-bold tracking-wide transition ${
            scroll ? "text-white" : "text-white"
          }`}
        >
          Hire<span className="text-blue-400">Hub</span> Co.
        </Link>

        <nav
          className={`hidden md:flex space-x-10 font-medium transition ${
            scroll ? "text-white" : "text-white"
          }`}
        >
          {currentLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-blue-400 transition ${
                location.pathname === link.to ? "font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="space-x-4 flex items-center">
          <Link
            to="/company/post-job"
            className={`px-4 py-2 rounded-md transition ${
              scroll
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-transparent border border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            Post a Job
          </Link>
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
        </div>
      </div>
    </header>
  );
};

export default CompanyNavbar;

