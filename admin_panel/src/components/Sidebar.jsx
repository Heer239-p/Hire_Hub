

// import React from 'react';
// import { FiHome, FiBriefcase, FiUsers, FiFileText, FiArchive, FiLogOut } from 'react-icons/fi';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { logout } from '../utils/auth'; // import logout function

// const navItems = [
//   { label: 'Dashboard', path: '/', icon: FiHome },
//   { label: 'Jobs', path: '/jobs', icon: FiBriefcase },
//   { label: 'Users', path: '/users', icon: FiUsers },
//   { label: 'Applications', path: '/applications', icon: FiFileText },
//   { label: 'Companies', path: '/companies', icon: FiArchive }, // new item
// ];

// const Sidebar = ({ collapsed }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login', { replace: true });
//   };

//   return (
//     <div
//       className={`${
//         collapsed ? 'w-16' : 'w-64'
//       } h-screen flex flex-col justify-between bg-gray-200 text-gray-700 transition-all duration-300`}
//     >
//       {/* Top - Logo and Nav */}
//       <div>
//         <div className="h-16 flex items-center justify-center ">
//              <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1T7QK6Tm3aWgDCBGJdcaCPTmMkpx9ClSSGA&s"
//             alt="user"
//             className="w-8 h-8 rounded-full"
//           />
//           {collapsed ? (
//             <span className="text-2xl font-bold">H</span>
//           ) : (
//             <h1 className="text-2xl font-bold tracking-wide">
//               Hire<span className="text-blue-500">Hub</span>
//             </h1>
//           )}
//         </div>

//         <nav className="flex flex-col gap-2 p-4">
//           {navItems.map(({ label, path, icon: Icon }) => {
//             const isActive = pathname === path;
//             return (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`flex items-center gap-4 p-2 rounded-md transition-all ${
//                   isActive
//                     ? 'bg-blue-600 text-white'
//                     : 'hover:bg-blue-600 hover:text-white'
//                 }`}
//               >
//                 <Icon className="text-xl" />
//                 {!collapsed && <span className="text-sm">{label}</span>}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Bottom - Logout */}
//       <div className="p-4">
//         <button
//           className="flex items-center gap-4 w-full p-2 rounded-md hover:bg-red-600 hover:text-white transition-colors"
//           onClick={handleLogout}
//         >
//           <FiLogOut className="text-xl" />
//           {!collapsed && <span className="text-sm">Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { FiHome, FiBriefcase, FiUsers, FiFileText, FiArchive, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const navItems = [
  { label: 'Dashboard', path: '/', icon: FiHome },
  { label: 'Jobs', path: '/jobs', icon: FiBriefcase },
  { label: 'Users', path: '/users', icon: FiUsers },
  { label: 'Applications', path: '/applications', icon: FiFileText },
  { label: 'Companies', path: '/companies', icon: FiArchive },
  { label: "Employers", path: "/employers", icon: FiUserPlus }, // New item
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
      className={`${collapsed ? 'w-16' : 'w-64'
        } h-screen flex flex-col justify-between bg-black-900 text-gray-700 transition-all duration-300`}
    >
      {/* Top - Logo and Nav */}
      <div>
        <div className="h-16 w-full flex items-center relative px-2">
          {/* Logo on the left corner */}
          <img
            src='https://xpertlab.com/wp-content/uploads/2023/05/Hire-Hub.jpg'
            alt="logo"
            className="w-8 h-8 rounded-full absolute left-2"
          />

          {/* Centered title */}
          {!collapsed ? (
            <h1 className="text-2xl text-white font-bold tracking-wide mx-auto">
              Hire<span className="text-blue-500">Hub</span>
            </h1>
          ) : (
            <span className="text-2xl text-white font-bold mx-auto">H</span>
          )}
        </div>



        <nav className="flex flex-col gap-2 p-4">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-4 p-2 rounded-md transition-all text-white ${isActive
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
      <div className="p-4">
        <button
          className="flex items-center gap-4 w-full p-2 rounded-md hover:bg-red-600 hover:text-white transition-colors text-white"
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
