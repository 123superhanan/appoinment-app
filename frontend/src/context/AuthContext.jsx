import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authApi } from "../utils/axios";
import { doctorApi } from "../utils/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });

  // Set Axios default token header if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // ---------------- Patient/Admin Signup ----------------
  const signup = async ({
    name,
    email,
    password,
    role = "patient",
    gender,
  }) => {
    const res = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
      role,
      gender,
    });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userData", JSON.stringify(res.data.user));
  };

  // ---------------- Patient/Admin Login ----------------
  const login = async ({ email, password }) => {
    try {
      const res = await authApi.post("/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  // ---------------- Doctor Login ----------------
  const doctorLogin = async ({ email, password }) => {
    try {
      const res = await doctorApi.post("/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      console.error("Doctor login error:", error.response?.data || error);
      throw error;
    }
  };

  // ---------------- Doctor Signup ----------------
  const doctorSignup = async (doctorData) => {
    try {
      const res = await doctorApi.post("/signup", doctorData);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token); // store token
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      console.error("Doctor signup error:", error.response?.data || error);
      throw error;
    }
  };

  // ---------------- Logout ----------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, doctorLogin, doctorSignup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
