import React from "react";
import useAuthUser from "../../hooks/useAuthUser";

const statCards = [
  { label: "Open Roles", value: 8, trend: "+2 this week" },
  { label: "Applicants", value: 128, trend: "+34 new" },
  { label: "Interviews", value: 12, trend: "5 scheduled" },
  { label: "Hires", value: 4, trend: "2 in onboarding" },
];

const Dashboard = () => {
  const user = useAuthUser();

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase text-slate-500 font-semibold tracking-wide">
          Welcome back
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          {user?.companyName || "Your Company"}
        </h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Track roles, manage applicants, and move faster with a focused employer workspace.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{card.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
            <p className="text-sm text-green-600 mt-1">{card.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Open Positions</h2>
          <ul className="space-y-4">
            {["Frontend Developer", "Data Analyst", "Product Designer"].map((role) => (
              <li key={role} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{role}</p>
                  <p className="text-sm text-slate-500">Active · 23 applicants</p>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                  View pipeline
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Interview Schedule</h2>
          <ul className="space-y-4">
            {[
              { name: "Aarav Patel", role: "Frontend Developer", time: "Tomorrow · 10:00 AM" },
              { name: "Priya Shah", role: "Product Designer", time: "Tomorrow · 2:00 PM" },
              { name: "Manav Desai", role: "QA Engineer", time: "Friday · 11:30 AM" },
            ].map((item) => (
              <li key={item.name} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
                <span className="text-sm font-medium text-slate-600">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
