import React, { useState } from "react";

const applicants = [
  {
    name: "Ishaan Shah",
    role: "Frontend Developer",
    experience: "4 years · React / Next.js",
    status: "Interview",
  },
  {
    name: "Neha Sharma",
    role: "Product Designer",
    experience: "5 years · SaaS / Fintech",
    status: "Portfolio Review",
  },
  {
    name: "Dev Patel",
    role: "QA Engineer",
    experience: "3 years · Automation",
    status: "Shortlisted",
  },
];

const statusStyles = {
  Interview: "bg-green-100 text-green-700",
  "Portfolio Review": "bg-indigo-100 text-indigo-700",
  Shortlisted: "bg-amber-100 text-amber-700",
};

const filterOptions = ["All", "Interview", "Shortlisted", "Portfolio Review"];

const Applicants = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter Logic
  const filteredApplicants =
    activeFilter === "All"
      ? applicants
      : applicants.filter((c) => c.status === activeFilter);

  return (
    <section>
      <div className="mb-8 py-12 text-center space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">
          Active Applicants
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Keep tabs on candidate progress and collaborate with your hiring team.
        </p>
      </div>

      {/* 🔵 FILTER BAR */}
      <div className="flex items-center gap-3 mb-6 py-2">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition 
              ${
                activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-100">
        <div className="grid grid-cols-4 py-4 px-6 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-100">
          <span>Name</span>
          <span>Role</span>
          <span>Experience</span>
          <span>Status</span>
        </div>

        {filteredApplicants.map((candidate) => (
          <div
            key={candidate.name}
            className="grid grid-cols-4 items-center py-5 px-6 border-b border-slate-50 last:border-none"
          >
            <div>
              <p className="font-semibold text-slate-900">{candidate.name}</p>
              <p className="text-xs text-slate-500">Applied 4 days ago</p>
            </div>

            <p className="text-sm font-medium text-slate-700">{candidate.role}</p>
            <p className="text-sm text-slate-500">{candidate.experience}</p>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusStyles[candidate.status] || "bg-slate-100 text-slate-700"
                }`}
              >
                {candidate.status}
              </span>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Applicants;
