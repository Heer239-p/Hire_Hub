import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
