// src/pages/Profile.jsx
import React from "react";

const Profile = () => {
  // You can hardcode admin details or fetch dynamically
  const admin = {
    name: "Admin Name",
    email: "admin@company.com",
    phone: "+91 1234567890",
    role: "Administrator",
    profileImage: "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png",
    joinedAt: "2024-01-15",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Admin Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={admin.profileImage}
            alt={admin.name}
            className="w-28 h-28 rounded-full border border-gray-300"
          />
        </div>

        {/* Admin Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Phone:</strong> {admin.phone}</p>
          <p><strong>Role:</strong> {admin.role}</p>
          <p><strong>Joined At:</strong> {new Date(admin.joinedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
