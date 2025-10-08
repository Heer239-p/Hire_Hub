import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiBell,
  FiMail,
  FiChevronDown,
  FiSearch,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";

// ✅ Import your image correctly
import adminDP from "../assets/images/admin_dp.png";

const Header = ({ onToggleSidebar, onLogout }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 w-full">
        {/* Menu button */}
        <button
          onClick={onToggleSidebar}
          className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          aria-label="Toggle Sidebar"
        >
          <FiMenu />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-sm focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 text-lg" />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-6">
        <FiBell className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" />
        {/* <FiMail className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" /> */}

        {/* Profile section */}
        <div className="flex items-center gap-2 cursor-pointer">
          {/* <img
            src={adminDP}
            alt="Admin Profile"
            className="w-15 h-15 rounded-full object-cover "
          /> */}
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Hiral
          </span>

          <FiChevronDown className="text-gray-600 dark:text-gray-300" />
           <img
            src={adminDP}
            alt="Admin Profile"
            className="w-15 h-15 rounded-full object-cover "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
