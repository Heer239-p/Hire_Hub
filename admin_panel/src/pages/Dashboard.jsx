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

// Recent Activity Component with color-coding
const RecentActivity = ({ activities }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-900">🕒 Recent Activity</h2>
    <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
      {activities.length === 0 ? (
        <li className="py-3 text-gray-500">No recent activity</li>
      ) : (
        activities.map((activity) => (
          <li key={activity.id} className="py-3 flex justify-between items-center">
            <p className={`text-sm font-medium ${activity.color}`}>{activity.message}</p>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </li>
        ))
      )}
    </ul>
  </div>
);

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
    { label: "Total Jobs", value: jobCount, icon: FiBriefcase, bgColor: "bg-blue-300", path: "/jobs" },
    { label: "Registered Users", value: userCount, icon: FiUsers, bgColor: "bg-green-200", path: "/users" },
    { label: "Applications", value: applicationCount, icon: FiFileText, bgColor: "bg-purple-200", path: "/applications" },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-8 transition-colors duration-300">

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, bgColor, path }, idx) => (
          <div
            key={idx}
            onClick={() => navigate(path)}
            className={`flex items-center ${bgColor} dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all cursor-pointer min-h-[100px] sm:min-h-[120px]`}
          >
            <div className={`p-3 sm:p-4 rounded-full flex items-center justify-center shrink-0 ${bgColor.replace("-100","-300")} dark:bg-gray-700`}>
              <Icon className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300" />
            </div>
            <div className="flex flex-col flex-1 min-w-0 ml-3 sm:ml-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
              <p className="mt-1 text-xs sm:text-sm md:text-base uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md dark:shadow-gray-900 flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Overall Distribution</h2>
          <PieChart width={200} height={200}>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
              {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Pie>
          </PieChart>
          <div className="mt-3 space-y-1">
            {pieData.map((entry, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="font-medium text-gray-700 dark:text-gray-300">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md dark:shadow-gray-900 min-h-[320px] flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Monthly Overview</h2>
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
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivities} />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">👤 Quick Actions</h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setOpenAddUser(true)}
              className="flex items-center justify-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition w-full"
            >
              <FiUsers /> Add User
            </button>
            <button
              onClick={() => setOpenAddJob(true)}
              className="flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 py-2 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition w-full"
            >
              <FiBriefcase /> Add Job
            </button>
            <button
              onClick={() => setOpenAddApplication(true)}
              className="flex items-center justify-center gap-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 py-2 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition w-full"
            >
              <FiEye /> Add Application
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
