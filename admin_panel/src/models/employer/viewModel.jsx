import React from "react";

const ViewModel = ({ employer, onClose }) => {
  if (!employer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl relative border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center justify-center">View Employer</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={employer.profileImage}
            alt={employer.name}
            className="w-24 h-24 rounded-full border border-gray-300"
          />
        </div>

        {/* Employer Info */}
        <div className="space-y-2 text-center md:text-left">
          <p><strong>Name:</strong> {employer.name}</p>
          <p><strong>Email:</strong> {employer.email}</p>
          <p><strong>Company:</strong> {employer.companyName}</p>
          <p><strong>Description:</strong> {employer.companyDescription}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={employer.companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              {employer.companyWebsite}
            </a>
          </p>
          <p><strong>Industry:</strong> {employer.industry}</p>
        </div>

        <div className="mt-5 flex justify-center md:justify-end">
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
