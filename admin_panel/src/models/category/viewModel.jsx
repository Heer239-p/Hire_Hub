import React from "react";

const ViewModel = ({ category, onClose }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">View Category</h2>

        <div className="grid grid-cols-1 gap-2">
          <p><strong>Title:</strong> {category.title}</p>
          <p><strong>Date:</strong> {category.createdDate}</p>
          <p><strong>Description:</strong> {category.description}</p>
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;
