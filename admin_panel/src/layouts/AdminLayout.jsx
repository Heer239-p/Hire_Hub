// Rename this file to AdminLayout.jsx or keep the same and rename here
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed top-0 left-0 h-screen z-20 bg-gray-900 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      <div
        className={`flex flex-col flex-1 transition-margin duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div
          className={`fixed top-0 right-0 h-16 bg-white shadow z-10 transition-all duration-300 ${
            collapsed ? 'left-16' : 'left-64'
          }`}
        >
          <Header onToggleSidebar={toggleSidebar} />
        </div>

        <main className="mt-16 flex-1 overflow-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
