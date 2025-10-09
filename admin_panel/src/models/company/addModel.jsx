import React, { useState } from "react";

const AddModel = ({ onClose }) => {
  const [form, setForm] = useState({ name: "", industry: "", website: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Added company:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-150">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Company</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {["name", "industry", "website", "description"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
