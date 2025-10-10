import React, { useState } from "react";

const UpdateModel = ({ category, onClose, onUpdate }) => {
  const [categoryData, setCategoryData] = useState(category || {});

  if (!category) return null;

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(categoryData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Update Category</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            name="title"
            placeholder="Category Title"
            value={categoryData.title}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={categoryData.description}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
