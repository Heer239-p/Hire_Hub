import React from "react";

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

const Applicants = () => {
  return (
    <section>
      <div className="mb-8">
        <p className="text-sm uppercase text-slate-500 font-semibold">Pipeline</p>
        <h1 className="text-3xl font-bold text-slate-900">Active Applicants</h1>
        <p className="text-slate-500 mt-2">
          Keep tabs on candidate progress and collaborate with your hiring team.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100">
        <div className="grid grid-cols-4 py-4 px-6 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-100">
          <span>Name</span>
          <span>Role</span>
          <span>Experience</span>
          <span>Status</span>
        </div>

        {applicants.map((candidate) => (
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
