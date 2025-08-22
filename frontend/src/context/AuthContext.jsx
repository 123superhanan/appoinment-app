import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Signup (Patient/Admin)
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

  // Login (Patient/Admin)
  const login = async ({ email, password }) => {
    const res = await axios.post("/api/auth/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  // Login (Doctor)
  // In your AuthContext doctorLogin function
  const doctorLogin = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/auth/doctor/login", {
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data; // Return the response data
    } catch (error) {
      console.error("Login error details:", error.response?.data);
      throw error; // Re-throw to handle in the component
    }
  };

  // In your DoctorLogin component
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await doctorLogin({ email, password });
      toast.success("Doctor login successful!");
      navigate("/doctor-dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", err.response?.data || err);
    }
  };

  const doctorSignup = async ({
    name,
    email,
    password,
    image = "", // Make it optional with default value
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
  }) => {
    const res = await axios.post("/api/auth/doctor/signup", {
      name,
      email,
      password,
      image, // Send empty string if not provided
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, doctorLogin, logout, doctorSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
