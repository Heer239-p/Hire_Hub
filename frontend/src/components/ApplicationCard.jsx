import React from "react";

const ApplicationCard = ({ app, onWithdraw }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all">
      {app.job.image && (
        <img
          src={app.job.image}
          alt={app.job.company}
          className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
        />
      )}

      <h3 className="text-2xl font-bold text-gray-800 mb-1">{app.job.title}</h3>
      <p className="text-blue-600 font-medium mb-1">{app.job.company}</p>
      <p className="text-gray-500 mb-3">{app.job.location}</p>

      <div className="flex justify-between items-center mb-3">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {app.job.jobType}
        </span>
        <span className="text-gray-700 font-semibold">{app.job.salary}</span>
      </div>

      <p className="mb-2">
        Status:{" "}
        <span
          className={`font-bold ${
            app.status === "Applied"
              ? "text-yellow-500"
              : app.status === "Reviewed"
              ? "text-blue-600"
              : app.status === "Shortlisted"
              ? "text-green-600"
              : app.status === "Rejected"
              ? "text-red-500"
              : "text-gray-600"
          }`}
        >
          {app.status}
        </span>
      </p>

      {app.resume && (
        <a
          href={app.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          View Resume
        </a>
      )}

      {onWithdraw && (
        <button
          onClick={() => onWithdraw(app._id)}
          className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
        >
          Withdraw Application
        </button>
      )}
    </div>
  );
};

export default ApplicationCard;
