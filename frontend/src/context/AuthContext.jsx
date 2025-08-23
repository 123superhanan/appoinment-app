import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // make sure this is imported
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ---------------- Patient Login ----------------
  const handlePatientLogin = async (loginData) => {
    try {
      const response = await axios.post("/api/auth/login", loginData);
      const { token, patient } = response.data;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userData", JSON.stringify(patient));
      localStorage.setItem("patientId", patient._id || patient.id);

      toast.success("Patient login successful!");
      setUser(patient);
      navigate("/patient/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Patient login failed");
    }
  };

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
  };

  // ---------------- Patient/Admin Login ----------------
  const login = async ({ email, password }) => {
    const res = await axios.post("/api/auth/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  // ---------------- Doctor Login ----------------
  const doctorLogin = async ({ email, password }) => {
    try {
      // 🔑 Use doctor-specific endpoint
      const res = await axios.post("/api/auth/doctor/login", {
        email,
        password,
      });

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      toast.success("Doctor login successful!");
      navigate("/doctor/dashboard");

      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Doctor login failed";
      toast.error(errorMessage);
      throw error;
    }
  };

  // ---------------- Doctor Signup ----------------
  const doctorSignup = async (formData) => {
    try {
      const res = await axios.post("/api/auth/doctor/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      toast.success("Doctor signup successful!");
      navigate("/doctor/dashboard");

      return res.data;
    } catch (error) {
      console.error("Doctor signup error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Doctor signup failed");
      throw error;
    }
  };

  // ---------------- Logout ----------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("patientId");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        doctorLogin,
        doctorSignup,
        handlePatientLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
