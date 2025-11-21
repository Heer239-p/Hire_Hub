import React, { useEffect, useState } from "react";
import { getAllJobs } from "../../api/jobApi";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { jobs: jobList } = await getAllJobs(1, 10);
      setJobs(jobList);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-slate-500 text-lg font-semibold animate-pulse">Loading jobs...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm uppercase text-slate-500 font-semibold">Jobs</p>
        <h1 className="text-3xl font-bold text-slate-900">Manage Roles & Pipelines</h1>
        <p className="text-slate-500 mt-2">
          Review role health, applicants, and quick actions from a single place.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <p className="text-lg font-semibold text-slate-900">{job.title}</p>
              <p className="text-sm text-slate-500">
                {job.company || "HireHub"} · {job.location || job.jobLocation || "Remote"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Posted on {new Date(job.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition">
                View Applicants
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-full hover:border-slate-400 transition">
                Pause Role
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-lg font-semibold text-slate-700">No roles posted yet</p>
            <p className="text-sm text-slate-500 mt-2">
              Create your first job to start receiving applicants.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageJobs;
