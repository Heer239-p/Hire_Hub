import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(() => {
    // Load from localStorage if available
    const savedImage = localStorage.getItem("adminProfileImage");
    return savedImage || "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png";
  });

  const [admin, setAdmin] = useState(() => {
    // Load from localStorage if available
    const savedAdmin = localStorage.getItem("adminData");
    return savedAdmin ? JSON.parse(savedAdmin) : {
      firstName: "Hiral",
      lastName: "Prajapati",
      dob: "1990-01-01",
      email: "admin@company.com",
      phone: "+91 1234567890",
      role: "Administrator",
      country: "India",
      city: "Ahmedabad",
      pincode: "380001",
    };
  });

  // Save to localStorage whenever profileImage changes
  useEffect(() => {
    localStorage.setItem("adminProfileImage", profileImage);
  }, [profileImage]);

  // Save to localStorage whenever admin data changes
  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(admin));
  }, [admin]);

  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  const updateAdmin = (updatedData) => {
    setAdmin((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        updateProfileImage,
        admin,
        updateAdmin,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
