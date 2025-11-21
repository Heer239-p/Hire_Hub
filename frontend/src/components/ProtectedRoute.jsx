import React from "react";
import { Navigate } from "react-router-dom";


  const parseUser = () => {
    try {
      const stored = localStorage.getItem("userInfo");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn("Unable to parse user info", error);
      return null;
    }
  };
  
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const userInfo = parseUser();
  
    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }
  
    if (
      Array.isArray(allowedRoles) &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(userInfo.role)
    ) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

export default ProtectedRoute;
