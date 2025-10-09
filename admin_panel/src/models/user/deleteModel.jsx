import React from "react";

const DeleteModel = ({ user, onClose, onDelete }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete User</h2>
        <p>Are you sure you want to delete <strong>{user.name}</strong>?</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => { onDelete(user.id); onClose(); }}
            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
