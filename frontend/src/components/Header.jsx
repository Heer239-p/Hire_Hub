import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <Link className="hover:text-blue-400 transition" to="/">Home</Link>
          <Link className="hover:text-blue-400 transition" to="/jobs">Jobs</Link>
          <Link className="hover:text-blue-400 transition" to="/candidates">Candidates</Link>
          <Link className="hover:text-blue-400 transition" to="/employers">Employers</Link>
          <Link className="hover:text-blue-400 transition" to="/contact">Contact</Link>
        </nav>

        {/* Buttons */}
        <div className="space-x-4">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
