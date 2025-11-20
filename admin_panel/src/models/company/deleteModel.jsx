import React from "react";

const DeleteModel = ({ company, onClose, onDelete }) => {
  if (!company) return null;

  const handleDelete = () => {
    onDelete(company.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-100 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete Company</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{company.name}</strong>?
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
