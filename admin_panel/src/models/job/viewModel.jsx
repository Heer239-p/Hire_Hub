import React from "react";

const ViewModel = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 w-full max-w-2xl shadow-2xl relative border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Job Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {/* Image Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Attachment</h3>
            {job.attachment ? (
              <div className="flex justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <img 
                  src={`http://localhost:5000/uploads/${job.attachment}`} 
                  alt="Job attachment" 
                  className="max-w-full max-h-40 object-contain rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/200x100?text=Image+Not+Found";
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center h-32 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-500 dark:text-gray-400 text-sm">No attachment available</span>
              </div>
            )}
          </div>

          {/* Job Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Title</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{job.title}</p>
              </div>
              
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Company</p>
                <p className="text-gray-800 dark:text-gray-200">{job.company}</p>
              </div>
              
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Category</p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {job.category}
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Location</p>
                <p className="text-gray-800 dark:text-gray-200">{job.location}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Job Type</p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {job.jobType}
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Salary</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{job.salary}</p>
              </div>
              
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === "Active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : job.status === "Pending" 
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" 
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}>
                    {job.status}
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Applicants</p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {job.applicants} applicants
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Description</p>
            <p className="text-gray-800 dark:text-gray-200 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              {job.description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Employer</p>
              <p className="text-gray-800 dark:text-gray-200">{job.employer}</p>
            </div>
            
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Created Date</p>
              <p className="text-gray-800 dark:text-gray-200">{job.createdAt}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;