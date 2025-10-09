import React from "react";

const ViewModel = ({ employer, onClose }) => {
  if (!employer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">View Employer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {employer.name}</p>
          <p><strong>Email:</strong> {employer.email}</p>
          <p><strong>Profile Image:</strong> <img src={employer.profileImage} alt={employer.name} className="w-12 h-12 rounded-full" /></p>
          <p><strong>Company Name:</strong> {employer.companyName}</p>
          <p><strong>Description:</strong> {employer.companyDescription}</p>
          <p><strong>Website:</strong> <a href={employer.companyWebsite} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{employer.companyWebsite}</a></p>
          <p><strong>Industry:</strong> {employer.industry}</p>
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;
