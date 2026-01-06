import React from "react";

const ViewModel = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center justify-center">
          View User
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          {user.profile ? (
            <img
              src={user.profile}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              alt="default profile"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
          )}
        </div>

        {/* Grid Layout for Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-700 dark:text-gray-300"><strong>First Name:</strong> {user.first_name}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Last Name:</strong> {user.last_name}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Role:</strong> {user.role}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
        </div>

        <div className="mt-5 flex justify-center md:justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;