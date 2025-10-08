import React from 'react';
import { FiHome, FiBriefcase, FiUsers, FiFileText, FiLogOut } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth'; // import logout function

const navItems = [
  { label: 'Dashboard', path: '/', icon: FiHome },
  { label: 'Jobs', path: '/jobs', icon: FiBriefcase },
  { label: 'Users', path: '/users', icon: FiUsers },
  { label: 'Applications', path: '/applications', icon: FiFileText },
];

const Sidebar = ({ collapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } h-screen flex flex-col justify-between bg-gray-200 text-gray-700 transition-all duration-300`}
    >
      {/* Top - Logo and Nav */}
      <div>
        <div className="h-16 flex items-center justify-center ">
          {collapsed ? (
            <span className="text-2xl font-bold">H</span>
          ) : (
            <h1 className="text-2xl font-bold tracking-wide">
              Hire<span className="text-blue-500">Hub</span>
            </h1>
          )}
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-4 p-2 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-600 hover:text-white'
                }`}
              >
                <Icon className="text-xl" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom - Logout */}
      <div className="p-4  ">
        <button
          className="flex items-center gap-4 w-full p-2 rounded-md hover:bg-red-600 hover:text-white transition-colors"
          onClick={handleLogout}
        >
          <FiLogOut className="text-xl" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
