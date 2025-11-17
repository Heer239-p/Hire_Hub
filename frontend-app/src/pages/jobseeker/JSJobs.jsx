import { useEffect, useState } from "react";
import { dummyAPI } from "../../api/dummyApi";
import React from "react";

const JSJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    dummyAPI.getJobs().then(setJobs);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Available Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 shadow border rounded">
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JSJobs;
