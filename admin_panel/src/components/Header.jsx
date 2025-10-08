import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
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

  const [showNotifications, setShowNotifications] = useState(false);

  // 💌 Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New user registered", time: "5 min ago" },
    { id: 2, message: "Job post 'UI Designer' approved", time: "20 min ago" },
    { id: 3, message: "3 new applications received", time: "1 hr ago" },
  ]);

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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between relative">
      {/* Left side */}
      <div className="flex items-center gap-4 w-full">
        <button
          onClick={onToggleSidebar}
          className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <FiMenu />
        </button>

        {/* Search bar */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-sm focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 text-lg" />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-6 relative">
        {/* 🔔 Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative focus:outline-none"
          >
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
            <FiBell className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" />
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3 z-50">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Notifications
              </h3>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <li
                      key={note.id}
                      className="text-sm text-gray-700 dark:text-gray-300 py-2 border-b border-gray-100 dark:border-gray-700 last:border-none"
                    >
                      {note.message}
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {note.time}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 dark:text-gray-400 py-2 text-center">
                    No new notifications
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Hiral
          </span>
          <FiChevronDown className="text-gray-600 dark:text-gray-300" />
          <img
            src={adminDP}
            alt="Admin Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
  