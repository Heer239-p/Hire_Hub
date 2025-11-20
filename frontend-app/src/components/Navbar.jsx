import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        HireHub
      </Link>

      <div className="flex gap-4">
        {!user && (
          <>
            <Link to="/jobseeker/login">Jobseeker Login</Link>
            <Link to="/company/login">Employer Login</Link>
          </>
        )}

        {user?.role === "jobseeker" && (
          <>
            <Link to="/jobseeker/dashboard">Dashboard</Link>
            <Link to="/jobseeker/jobs">Jobs</Link>
          </>
        )}

        {user?.role === "company" && (
          <>
            <Link to="/company/dashboard">Dashboard</Link>
            <Link to="/company/post-job">Post Job</Link>
            <Link to="/company/manage-jobs">Manage Jobs</Link>
          </>
        )}

        {user && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
