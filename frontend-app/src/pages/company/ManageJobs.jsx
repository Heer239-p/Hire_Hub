import { useEffect, useState } from "react";
import { dummyAPI } from "../../api/dummyApi";
import React from "react";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    dummyAPI.getEmployerJobs().then(setJobs);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Posted Jobs</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-gray-600">
              Applicants: <b>{job.applicants}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
