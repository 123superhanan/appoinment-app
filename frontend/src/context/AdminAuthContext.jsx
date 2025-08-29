// src/context/AdminAuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminCount, setAdminCount] = useState(0);
  const [loading, setLoading] = useState(true); // loading while checking token

  // Load admin from token on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios
        .get("/api/admin/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAdmin(res.data.admin);
        })
        .catch(() => {
          localStorage.removeItem("adminToken"); // invalid token
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

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

  // Admin signup
  const signupAdmin = async (name, email, password) => {
    try {
      const res = await axios.post("/api/admin/auth/signup", {
        name,
        email,
        password,
      });
      setAdminCount((prev) => prev + 1);
      toast.success(res.data.message || "Admin created successfully!");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  // Logout
  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    toast.info("Logged out successfully");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        adminCount,
        loginAdmin,
        signupAdmin,
        logoutAdmin,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => React.useContext(AdminAuthContext);
export default AdminAuthContext;
