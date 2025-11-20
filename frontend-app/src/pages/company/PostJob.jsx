import { useState } from "react";
import { dummyAPI } from "../../api/dummyApi";
import React from "react";

const PostJob = () => {
  const [job, setJob] = useState({
    title: "",
    location: "",
    salary: "",
  });

  const handleSubmit = async () => {
    await dummyAPI.postJob(job);
    alert("Job Posted Successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>

      <input
        className="border p-3 w-full mt-2 rounded"
        placeholder="Job Title"
        onChange={(e) => setJob({ ...job, title: e.target.value })}
      />

      <input
        className="border p-3 w-full mt-3 rounded"
        placeholder="Location"
        onChange={(e) => setJob({ ...job, location: e.target.value })}
      />

      <input
        className="border p-3 w-full mt-3 rounded"
        placeholder="Salary"
        onChange={(e) => setJob({ ...job, salary: e.target.value })}
      />

      <button
        className="w-full bg-blue-600 text-white p-3 rounded mt-4 hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Post Job
      </button>
    </div>
  );
};

export default PostJob;
