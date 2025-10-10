// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiBriefcase, FiUsers, FiFileText, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// import { fetchJobs } from "../services/jobService";
// import { fetchUsers } from "../services/userService";
// import { fetchApplications } from "../services/applicationServices";

// import AddUserModal from "../models/user/addModel";
// import AddJobModal from "../models/job/addModel";
// import AddApplicationModal from "../models/application/addModel";

// // Custom Tooltip for charts
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
//         <p className="font-semibold text-gray-700 mb-2">{label}</p>
//         {payload.map((entry) => (
//           <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
//             {entry.name}: <span className="font-bold">{entry.value}</span>
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// // Recent Activity Component
// const RecentActivity = ({ activities }) => (
//   <div className="bg-white rounded-2xl shadow-md p-6">
//     <h2 className="text-lg font-semibold mb-4 text-gray-900">🕒 Recent Activity</h2>
//     <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
//       {activities.length === 0 ? (
//         <li className="py-3 text-gray-500">No recent activity</li>
//       ) : (
//         activities.map((activity) => (
//           <li key={activity.id} className="py-3 flex justify-between items-center">
//             <p className="text-gray-700">{activity.message}</p>
//             <span className="text-sm text-gray-500">{activity.time}</span>
//           </li>
//         ))
//       )}
//     </ul>
//   </div>
// );

// const Dashboard = () => {
//   const navigate = useNavigate();

//   // Counts
//   const [jobCount, setJobCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);
//   const [applicationCount, setApplicationCount] = useState(0);

//   // Recent activities
//   const [recentActivities, setRecentActivities] = useState([]);

//   // Modals
//   const [openAddUser, setOpenAddUser] = useState(false);
//   const [openAddJob, setOpenAddJob] = useState(false);
//   const [openAddApplication, setOpenAddApplication] = useState(false);

//   // Load counts on mount
//   useEffect(() => {
//     const loadCounts = async () => {
//       try {
//         const jobsData = await fetchJobs(1, "", 1000);
//         setJobCount(jobsData.total || jobsData.jobs.length);

//         const usersData = await fetchUsers(1, "", 1000);
//         setUserCount(usersData.total || usersData.users.length);

//         const appsData = await fetchApplications(1, "", 1000);
//         setApplicationCount(appsData.total || appsData.applications.length);
//       } catch (err) {
//         console.error("Error loading counts:", err);
//       }
//     };
//     loadCounts();
//   }, []);

//   // Function to add recent activity
//   const addActivity = (action, entity, name) => {
//     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const message = `${action} ${entity}: ${name}`;
//     setRecentActivities(prev => [{ id: Date.now(), message, time }, ...prev].slice(0, 20));
//   };

//   // CRUD Handlers
//   const handleAddUser = (user) => { addActivity("Added", "User", `${user.first_name} ${user.last_name}`); setUserCount(prev => prev + 1); };
//   const handleUpdateUser = (user) => { addActivity("Updated", "User", `${user.first_name} ${user.last_name}`); };
//   const handleDeleteUser = (user) => { addActivity("Deleted", "User", `${user.first_name} ${user.last_name}`); setUserCount(prev => prev - 1); };

//   const handleAddJob = (job) => { addActivity("Added", "Job", job.title); setJobCount(prev => prev + 1); };
//   const handleUpdateJob = (job) => { addActivity("Updated", "Job", job.title); };
//   const handleDeleteJob = (job) => { addActivity("Deleted", "Job", job.title); setJobCount(prev => prev - 1); };

//   const handleAddApplication = (app) => { addActivity("Added", "Application", app.jobTitle); setApplicationCount(prev => prev + 1); };
//   const handleUpdateApplication = (app) => { addActivity("Updated", "Application", app.jobTitle); };
//   const handleDeleteApplication = (app) => { addActivity("Deleted", "Application", app.jobTitle); setApplicationCount(prev => prev - 1); };

//   // Stats for cards
//   const stats = [
//     { label: "Total Jobs", value: jobCount, icon: FiBriefcase, bgColor: "bg-blue-300", path: "/jobs" },
//     { label: "Registered Users", value: userCount, icon: FiUsers, bgColor: "bg-green-200", path: "/users" },
//     { label: "Applications", value: applicationCount, icon: FiFileText, bgColor: "bg-purple-200", path: "/applications" },
//   ];

//   const currentMonth = new Date().toLocaleString("default", { month: "short" });

//   const chartData = [
//     { month: "May", jobs: 100, users: 450, applications: 200 },
//     { month: "Jun", jobs: 110, users: 480, applications: 220 },
//     { month: "Jul", jobs: 120, users: 500, applications: 240 },
//     { month: "Aug", jobs: 130, users: 520, applications: 260 },
//     { month: "Sep", jobs: 140, users: 540, applications: 280 },
//     { month: `${currentMonth} (Now)`, jobs: jobCount, users: userCount, applications: applicationCount },
//   ];

//   const pieData = [
//     { name: "Jobs", value: jobCount, color: "#3b82f6" },
//     { name: "Users", value: userCount, color: "#10b981" },
//     { name: "Applications", value: applicationCount, color: "#8b5cf6" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">

//       {/* Stats Cards */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
//         {stats.map(({ label, value, icon: Icon, bgColor, path }, idx) => (
//           <div
//             key={idx}
//             onClick={() => navigate(path)}
//             className={`flex items-center ${bgColor} rounded-2xl shadow-md p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all cursor-pointer min-h-[100px] sm:min-h-[120px]`}
//           >
//             <div className={`p-3 sm:p-4 rounded-full flex items-center justify-center shrink-0 ${bgColor.replace("-100","-300")}`}>
//               <Icon className="text-xl sm:text-2xl md:text-3xl text-gray-700" />
//             </div>
//             <div className="flex flex-col flex-1 min-w-0 ml-3 sm:ml-4">
//               <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{value}</p>
//               <p className="mt-1 text-xs sm:text-sm md:text-base uppercase tracking-wide text-gray-500">{label}</p>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Charts */}
//       <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//         {/* Pie */}
//         <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center min-h-[400px]">
//           <h2 className="text-lg font-semibold mb-4 text-gray-900">Overall Distribution</h2>
//           <PieChart width={200} height={200}>
//             <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
//               {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
//             </Pie>
//           </PieChart>
//           <div className="mt-3 space-y-1">
//             {pieData.map((entry, idx) => (
//               <div key={idx} className="flex items-center space-x-2 text-sm">
//                 <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
//                 <span className="font-medium text-gray-700">{entry.name}: {entry.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-2xl p-6 shadow-md min-h-[320px] flex flex-col justify-center">
//           <h2 className="text-lg font-semibold mb-4 text-gray-900">Monthly Overview</h2>
//           <ResponsiveContainer width="100%" height={220}>
//             <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
//               <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} />
//               <YAxis stroke="#9ca3af" tickLine={false} />
//               <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
//               <Legend verticalAlign="top" height={25} />
//               <Bar dataKey="jobs" name="Jobs" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
//               <Bar dataKey="users" name="Users" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
//               <Bar dataKey="applications" name="Applications" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={20} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       {/* Recent Activity + Quick Actions */}
//       <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <RecentActivity activities={recentActivities} />

//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-4 text-gray-900">👤 Quick Actions</h2>
//           <div className="flex flex-col gap-4">
//             <button onClick={() => setOpenAddUser(true)} className="flex items-center justify-center gap-2 bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition w-full"><FiUsers /> Add User</button>
//             <button onClick={() => setOpenAddJob(true)} className="flex items-center justify-center gap-2 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition w-full"><FiBriefcase /> Add Job</button>
//             <button onClick={() => setOpenAddApplication(true)} className="flex items-center justify-center gap-2 bg-yellow-100 text-yellow-700 py-2 rounded-lg hover:bg-yellow-200 transition w-full"><FiEye /> Add Application</button>
//           </div>
//         </div>
//       </section>

//       {/* Modals */}
//       {openAddUser && <AddUserModal onClose={() => setOpenAddUser(false)} onAdd={(user) => { handleAddUser(user); setOpenAddUser(false); }} />}
//       {openAddJob && <AddJobModal onClose={() => setOpenAddJob(false)} onAdd={(job) => { handleAddJob(job); setOpenAddJob(false); }} />}
//       {openAddApplication && <AddApplicationModal onClose={() => setOpenAddApplication(false)} onAdd={(app) => { handleAddApplication(app); setOpenAddApplication(false); }} />}
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBriefcase, FiUsers, FiFileText, FiEye } from "react-icons/fi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { fetchJobs, addJob } from "../services/jobService";
import { fetchUsers, addUser } from "../services/userService";
import { fetchApplications, addApplication } from "../services/applicationServices";
import { addActivity as logActivity } from "../utils/activityLogger";

import AddUserModal from "../models/user/addModel";
import AddJobModal from "../models/job/addModel";
import AddApplicationModal from "../models/application/addModel";

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        <p className="font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Recent Activity Component with pagination
const RecentActivity = ({ activities }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities.slice(startIndex, endIndex);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">🕒 Recent Activity</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activities.length} total
        </span>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 flex-1 overflow-hidden">
        {currentActivities.length === 0 ? (
          <li className="py-3 text-gray-500 dark:text-gray-400">No recent activity</li>
        ) : (
          currentActivities.map((activity) => (
            <li key={activity.id} className="py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 px-2 rounded transition-colors">
              <p className={`text-sm font-medium ${activity.color || 'text-gray-700 dark:text-gray-300'}`}>
                {activity.message}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                {activity.time}
              </span>
            </li>
          ))
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  // Counts
  const [jobCount, setJobCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);

  // Tables
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // Recent activities
  const [recentActivities, setRecentActivities] = useState([]);

  // Load recent activities from localStorage
  const loadActivities = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("recentActivities") || "[]");
      if (Array.isArray(saved)) {
        setRecentActivities(saved);
        console.log("📊 Dashboard: Loaded activities:", saved.length);
      }
    } catch (e) {
      console.error("Failed to load recent activities from localStorage", e);
    }
  };

  // Load recent activities on mount
  useEffect(() => {
    loadActivities();
  }, []);

  // Listen for activity updates from other components
  useEffect(() => {
    const handleActivityUpdate = () => {
      console.log("🔔 Dashboard: Activity update event received");
      loadActivities();
    };

    window.addEventListener("activityUpdated", handleActivityUpdate);

    return () => {
      window.removeEventListener("activityUpdated", handleActivityUpdate);
    };
  }, []);

  // Modals
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddJob, setOpenAddJob] = useState(false);
  const [openAddApplication, setOpenAddApplication] = useState(false);

  // Load counts and initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Initialize and load jobs from localStorage
        await fetchJobs(1, "", 1000);
        const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
        setJobs(storedJobs);
        setJobCount(storedJobs.length);

        // Initialize and load users from localStorage
        await fetchUsers(1, "", 1000);
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(storedUsers);
        setUserCount(storedUsers.length);

        // Initialize and load applications from localStorage
        await fetchApplications(1, "", 1000);
        const storedApplications = JSON.parse(localStorage.getItem("applications") || "[]");
        setApplications(storedApplications);
        setApplicationCount(storedApplications.length);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    loadData();
  }, []);

  // Handlers
  const handleAddUser = async (user) => {
    try {
      const addedUser = await addUser(user);
      console.log("User added successfully:", addedUser);
      
      // Reload users from localStorage to ensure sync
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      setUsers(storedUsers);
      setUserCount(storedUsers.length);
      
      // Log activity using shared utility
      logActivity("Added", "User", `${user.first_name} ${user.last_name}`);
      
      // Reload activities to update UI
      loadActivities();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleAddJob = async (job) => {
    try {
      const addedJob = await addJob(job);
      console.log("Job added successfully:", addedJob);
      
      // Reload jobs from localStorage to ensure sync
      const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      setJobs(storedJobs);
      setJobCount(storedJobs.length);
      
      // Log activity using shared utility
      logActivity("Added", "Job", job.title);
      
      // Reload activities to update UI
      loadActivities();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleAddApplication = async (app) => {
    try {
      const addedApp = await addApplication(app);
      console.log("Application added successfully:", addedApp);
      
      // Reload applications from localStorage to ensure sync
      const storedApplications = JSON.parse(localStorage.getItem("applications") || "[]");
      setApplications(storedApplications);
      setApplicationCount(storedApplications.length);
      
      // Log activity using shared utility
      logActivity("Added", "Application", app.jobTitle);
      
      // Reload activities to update UI
      loadActivities();
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };

  // Stats for cards
  const stats = [
    { 
      label: "Total Jobs", 
      value: jobCount, 
      icon: FiBriefcase, 
      bgColor: "bg-blue-100", 
      iconBg: "bg-blue-200",
      textColor: "text-blue-600",
      path: "/jobs",
      trend: "+12%",
      trendUp: true
    },
    { 
      label: "Registered Users", 
      value: userCount, 
      icon: FiUsers, 
      bgColor: "bg-blue-100", 
      iconBg: "bg-blue-200",
      textColor: "text-blue-600",
      path: "/users",
      trend: "+8%",
      trendUp: true
    },
    { 
      label: "Applications", 
      value: applicationCount, 
      icon: FiFileText, 
      bgColor: "bg-blue-100", 
      iconBg: "bg-blue-200",
      textColor: "text-blue-600",
      path: "/applications",
      trend: "+15%",
      trendUp: true
    },
  ];

  const currentMonth = new Date().toLocaleString("default", { month: "short" });

  const chartData = [
    { month: "May", jobs: 100, users: 450, applications: 200 },
    { month: "Jun", jobs: 110, users: 480, applications: 220 },
    { month: "Jul", jobs: 120, users: 500, applications: 240 },
    { month: "Aug", jobs: 130, users: 520, applications: 260 },
    { month: "Sep", jobs: 140, users: 540, applications: 280 },
    { month: `${currentMonth} (Now)`, jobs: jobCount, users: userCount, applications: applicationCount },
  ];

  const pieData = [
    { name: "Jobs", value: jobCount, color: "#3b82f6" },
    { name: "Users", value: userCount, color: "#10b981" },
    { name: "Applications", value: applicationCount, color: "#8b5cf6" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      
      {/* Welcome Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, bgColor, iconBg, textColor, path, trend, trendUp }, idx) => (
          <div
            key={idx}
            onClick={() => navigate(path)}
            className={`group relative overflow-hidden ${bgColor} hover:bg-blue-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 cursor-pointer border border-blue-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:scale-105`}
          >
            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${iconBg} group-hover:bg-blue-300 dark:bg-gray-700 dark:group-hover:bg-gray-600 transition-colors duration-300`}>
                  <Icon className={`text-2xl ${textColor} group-hover:text-blue-700 dark:text-gray-300 dark:group-hover:text-blue-400 transition-colors duration-300`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300`}>
                  <span>{trend}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {trendUp ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    )}
                  </svg>
                </div>
              </div>
              
              <div>
                <p className={`text-4xl font-bold ${textColor} group-hover:text-blue-800 dark:text-gray-100 dark:group-hover:text-blue-300 transition-colors duration-300 mb-2`}>
                  {value}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-wide">
                  {label}
                </p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-200/30 dark:bg-white/10 rounded-full group-hover:scale-150 group-hover:bg-blue-300/40 transition-all duration-500" />
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Overall Distribution</h2>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <PieChart width={280} height={280}>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="mt-6 space-y-2 w-full">
              {pieData.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Monthly Overview</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Trending Up</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} />
              <YAxis stroke="#9ca3af" tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
              <Legend verticalAlign="top" height={25} />
              <Bar dataKey="jobs" name="Jobs" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="users" name="Users" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="applications" name="Applications" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Activity + Quick Actions */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivities} />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Quick Actions</h2>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setOpenAddUser(true)}
              className="flex items-center justify-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-3 px-4 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-all duration-200 w-full font-medium"
            >
              <FiUsers className="text-lg" /> 
              Add User
            </button>
            <button
              onClick={() => setOpenAddJob(true)}
              className="flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 py-3 px-4 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-200 w-full font-medium"
            >
              <FiBriefcase className="text-lg" /> 
              Add Job
            </button>
            <button
              onClick={() => setOpenAddApplication(true)}
              className="flex items-center justify-center gap-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 py-3 px-4 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-all duration-200 w-full font-medium"
            >
              <FiFileText className="text-lg" /> 
              Add Application
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {openAddUser && <AddUserModal onClose={() => setOpenAddUser(false)} onAdd={async (user) => { await handleAddUser(user); setOpenAddUser(false); }} />}
      {openAddJob && <AddJobModal onClose={() => setOpenAddJob(false)} onAdd={async (job) => { await handleAddJob(job); setOpenAddJob(false); }} />}
      {openAddApplication && <AddApplicationModal onClose={() => setOpenAddApplication(false)} onAdd={async (app) => { await handleAddApplication(app); setOpenAddApplication(false); }} />}
    </div>
  );
};

export default Dashboard;
