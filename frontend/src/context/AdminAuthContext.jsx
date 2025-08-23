// src/context/AdminAuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminCount, setAdminCount] = useState(0);

  //   // Fetch admin count on component mount
  //   useEffect(() => {
  //     fetchAdminCount();
  //   }, []);

  //   const fetchAdminCount = async () => {
  //     try {
  //       const res = await axios.get("/api/admin/count");
  //       setAdminCount(res.data.count);
  //     } catch (err) {
  //       console.error("Failed to fetch admin count:", err);
  //     }
  //   };

  // Admin login
  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post("/api/admin/auth/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      setAdmin(res.data.admin);
      toast.success(`Welcome ${res.data.admin.name}`);
      return res.data.admin;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Admin signup - update count after successful signup
  const signupAdmin = async (name, email, password) => {
    try {
      console.log("Attempting signup with:", { name, email });
      const res = await axios.post("/api/admin/auth/signup", {
        name,
        email,
        password,
      });
      setAdminCount((prev) => prev + 1); // Update count
      toast.success(res.data.message || "Admin created successfully!");
      return res.data;
    } catch (err) {
      console.error("Signup error:", err);
      console.error("Response:", err.response);
      toast.error(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  // Logout
  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        adminCount,
        loginAdmin,
        signupAdmin,
        logoutAdmin,
        //fetchAdminCount,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
export const useAdminAuth = () => React.useContext(AdminAuthContext);
export default AdminAuthContext;
