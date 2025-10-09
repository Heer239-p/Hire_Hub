import { useState, useEffect } from "react";
import { FiMenu, FiSun, FiMoon, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 
import adminDP from "../assets/images/admin_dp.png";
import profile from "../pages/profile";
const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Notifications logic
  const [showNotifications, setShowNotifications] = useState(false);
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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      {/* Left: menu toggle */}
      <button
        onClick={onToggleSidebar}
        className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <FiMenu />
      </button>

        {/* Center: Welcome Text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-700 dark:text-gray-200">
        Welcome Admin 
      </div>


      {/* Right: notifications, dark mode & profile */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
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

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-gray-300 text-xl hover:text-blue-600 dark:hover:text-blue-400"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* Admin Profile Image */}
        <img
  src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"
  alt="Admin Profile"
  onClick={() => navigate("/profile")}
  className="w-10 h-10 rounded-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
/>

      </div>
    </header>
  );
};

export default Header;
