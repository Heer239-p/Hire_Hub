import React, { useState } from "react";

const UpdateModel = ({ section, adminData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(adminData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-xl relative border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          ✏️ Edit {section === "personal" ? "Personal Information" : "Address"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {section === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {section === "address" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
