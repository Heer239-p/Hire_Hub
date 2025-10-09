import React, { useState } from "react";
import { FiEdit,FiCamera  } from "react-icons/fi";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const admin = {
    firstName: "Admin",
    lastName: "Name",
    dob: "1990-01-01",
    email: "admin@company.com",
    phone: "+91 1234567890",
    role: "Administrator",
    country: "India",
    city: "Ahmedabad",
    pincode: "380001",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col gap-6">
     <h3 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h3>
      {/* Card 1: Profile */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">
        {/* Profile Image */}
                <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-400 object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full cursor-pointer text-white shadow hover:bg-indigo-600">
            <input type="file" className="hidden" onChange={handleImageUpload} />
            <FiCamera size={18} />
          </label>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col justify-center gap-1">
          <p className="text-2xl font-semibold text-gray-800">{`${admin.firstName} ${admin.lastName}`}</p>
          <p className="text-gray-500">{admin.country}</p>
          <p className="text-gray-500">{admin.email}</p>
        </div>
      </div>

      {/* Card 2: Personal Information */}
      <div className="bg-white rounded-2xl shadow-md p-6 relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <FiEdit size={20} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">First Name</p>
            <p>{admin.firstName}</p>
          </div>
          <div>
            <p className="font-medium">Last Name</p>
            <p>{admin.lastName}</p>
          </div>
          <div>
            <p className="font-medium">Date of Birth</p>
            <p>{admin.dob}</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p>{admin.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p>{admin.phone}</p>
          </div>
          <div>
            <p className="font-medium">Role</p>
            <p>{admin.role}</p>
          </div>
        </div>
      </div>

      {/* Card 3: Address */}
      <div className="bg-white rounded-2xl shadow-md p-6 relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <FiEdit size={20} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Country</p>
            <p>{admin.country}</p>
          </div>
          <div>
            <p className="font-medium">City</p>
            <p>{admin.city}</p>
          </div>
          <div>
            <p className="font-medium">Pincode</p>
            <p>{admin.pincode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
