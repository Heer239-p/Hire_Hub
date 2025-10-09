import React from "react";

const DeleteModel = ({ job, onClose, onConfirm }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-100  text-center">
        <h2 className="text-xl font-semibold mb-4">Delete Job</h2>
        <p>Are you sure you want to delete <strong>{job.title}</strong>?</p>
        <div className="flex justify-center space-x-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
