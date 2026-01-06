import React from "react";

const ViewModel = ({ company, onClose }) => {
  if (!company) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl relative border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">View Company</h2>

        <div className="space-y-2">
          <p><strong>Company Name:</strong> {company.companyName || "N/A"}</p>
          <p><strong>Industry:</strong> {company.industry || "N/A"}</p>
          <p>
            <strong>Website:</strong>{" "}
            {company.companyWebsite ? (
              <a
                href={company.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                {company.companyWebsite}
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <p><strong>Description:</strong> {company.companyDescription || "N/A"}</p>
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