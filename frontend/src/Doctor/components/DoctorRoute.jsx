import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DoctorRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return user.role === "doctor" ? children : <Navigate to="/" />;
};

export default DoctorRoute;
