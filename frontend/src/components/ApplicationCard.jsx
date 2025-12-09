import React from "react";

const ApplicationCard = ({ app, onWithdraw }) => {
  const job = app?.job || {};

  const getStatusClasses = (status) => {
    switch (status) {
      case "Applied":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Reviewed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Shortlisted":
        return "bg-green-50 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all flex flex-col gap-4">
      {/* Job header */}
      <div>
        {job.image && (
          <img
            src={job.image}
            alt={job.company}
            className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
          />
        )}

        <h3 className="text-2xl font-bold text-gray-900 mb-1 line-clamp-2">
          {job.title}
        </h3>
        <p className="text-blue-600 font-semibold mb-1">{job.company}</p>
        <p className="text-gray-500 text-sm">{job.location}</p>
      </div>

      {/* Job meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
        {job.jobType && (
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
            {job.jobType}
          </span>
        )}
        {job.salary && (
          <span className="text-gray-800 font-semibold text-sm">
            {job.salary}
          </span>
        )}
      </div>

      <hr className="border-gray-100 my-2" />

      {/* Application details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-500">Application status</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(
              app.status
            )}`}
          >
            {app.status || "Unknown"}
          </span>
        </div>

        {app.appliedAt && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-500">Applied on</span>
            <span className="text-gray-800 font-medium">
              {new Date(app.appliedAt).toLocaleDateString()}
            </span>
          </div>
        )}

        {app.email && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-800 font-medium break-all">
              {app.email}
            </span>
          </div>
        )}

        {app.name && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-500">Candidate</span>
            <span className="text-gray-800 font-medium">{app.name}</span>
          </div>
        )}

        {app.resume && (
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-gray-500">Resume</span>
            <a
              href={`/uploads/${app.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium"
            >
              View resume
            </a>
          </div>
        )}
      </div>

      {onWithdraw && (
        <button
          onClick={() => onWithdraw(app._id)}
          className="mt-4 w-full py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
        >
          Withdraw application
        </button>
      )}
    </div>
  );
};

export default ApplicationCard;
