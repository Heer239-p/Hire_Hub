import React from "react";

const EmpDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employer Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">Post New Job</h3>
          <p className="text-gray-600">Create openings for jobseekers.</p>
        </div>

        <div className="p-4 border rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">Manage Jobs</h3>
          <p className="text-gray-600">View jobs and applicants.</p>
        </div>

        <div className="p-4 border rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">Company Profile</h3>
          <p className="text-gray-600">Manage your company info.</p>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
