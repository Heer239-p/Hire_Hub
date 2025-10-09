import React from "react";

const ViewModel = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">View Application</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Job Title:</strong> {application.jobTitle}</p>
          <p><strong>Applicant:</strong> {application.applicant}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Status:</strong> {application.status}</p>
          <p><strong>Applied On:</strong> {application.appliedDate}</p>
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;
