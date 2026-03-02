import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
};

export default ProtectedRoutes;
