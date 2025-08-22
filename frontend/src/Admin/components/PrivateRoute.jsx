// components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const PrivateRoute = ({ children }) => {
  const { admin } = useContext(AdminAuthContext);

  // Check if admin is authenticated
  const isAuthenticated = admin && localStorage.getItem("adminToken");

  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
