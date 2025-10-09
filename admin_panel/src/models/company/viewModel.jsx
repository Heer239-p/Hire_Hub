import React from "react";

const ViewModel = ({ company, onClose }) => {
  if (!company) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-150">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">View Company</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-24 h-24 rounded-full border border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <p><strong>Name:</strong> {company.name}</p>
          <p><strong>Industry:</strong> {company.industry}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {company.website}
            </a>
          </p>
          <p><strong>Description:</strong> {company.description}</p>
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
