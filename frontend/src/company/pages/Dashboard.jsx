import React, { useEffect, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { getEmployerDashboardStats } from "../../services/api/dashboardApi";

const Dashboard = () => {
  const user = useAuthUser();
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getEmployerDashboardStats();
        if (data.status === "success") {
          setStats(data.result.stats);
          setRecentJobs(data.result.recentJobs);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8 py-16">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">
            {user?.companyName || "Your Company"}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Loading dashboard data...
          </p>
        </div>
      </section>
    );
  }

  // Function to get status color based on application status
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Reviewed":
        return "bg-purple-100 text-purple-800";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-800";
      case "Hired":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="space-y-8 py-16">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">
          {user?.companyName || "Your Company"}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Track roles, manage applicants, and move faster with a focused employer workspace.
        </p>
      </div>

      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-700">Total Jobs</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalJobs}</p>
            <p className="text-sm text-blue-600 mt-1">{stats.activeJobs} active</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">Applicants</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalApplications}</p>
            <p className="text-sm text-indigo-600 mt-1">{stats.statusCounts.Applied || 0} new</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">Interviews</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.statusCounts.Shortlisted || 0}</p>
            <p className="text-sm text-amber-600 mt-1">{stats.statusCounts.Reviewed || 0} reviewed</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">Hires</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.statusCounts.Hired || 0}</p>
            <p className="text-sm text-emerald-600 mt-1">{stats.statusCounts.Rejected || 0} rejected</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Positions</h2>
          <ul className="space-y-4">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <li key={job._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                  <div>
                    <p className="font-semibold text-slate-800">{job.title}</p>
                    <p className="text-sm text-slate-500">
                      Posted on {new Date(job.createdAt).toLocaleDateString()} · {job.applicantCount || 0} applicants
                    </p>
                  </div>
                  {/* <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition">
                    View pipeline
                  </button> */}
                </li>
              ))
            ) : (
              <li className="text-slate-500 text-center py-4">No jobs posted yet</li>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Application Status</h2>
          <ul className="space-y-3">
            {stats ? (
              Object.entries(stats.statusCounts).map(([status, count]) => (
                <li key={status} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{count}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 text-center py-4">No applications yet</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;