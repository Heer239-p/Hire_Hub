import React from "react";

const ViewModel = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">View Job</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Title:</strong> {job.title}</p>
          </div>
          <div>
            <p><strong>Company:</strong> {job.company}</p>
          </div>
          <div>
            <p><strong>Category:</strong> {job.category}</p>
          </div>
          <div>
            <p><strong>Location:</strong> {job.location}</p>
          </div>
          <div>
            <p><strong>Type:</strong> {job.type}</p>
          </div>
          <div>
            <p><strong>Posted Date:</strong> {job.postedDate}</p>
          </div>
          <div>
            <p><strong>Expiry Date:</strong> {job.expiryDate}</p>
          </div>
          <div>
            <p><strong>Applications:</strong> {job.applications}</p>
          </div>
          <div>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;
