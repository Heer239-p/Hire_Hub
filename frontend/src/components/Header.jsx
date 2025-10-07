// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#0b132b] text-white py-4 fixed top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400">
          Hire<span className="text-white">Hub</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/jobs" className="hover:text-blue-400">Jobs</Link>
          <Link to="/candidates" className="hover:text-blue-400">Candidates</Link>
          <Link to="/employers" className="hover:text-blue-400">Employers</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        </nav>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#0b132b] transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-[#0b132b] rounded-md hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
