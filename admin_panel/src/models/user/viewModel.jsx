import React from "react";

const ViewModel = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center justify-center">
          View User
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user.profile}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-24 h-24 rounded-full border border-gray-300"
          />
        </div>

        {/* Grid Layout for Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Category:</strong> {user.category}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
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
