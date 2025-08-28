import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // your backend port
  // You can add headers here if needed
});

export default instance;

// Admin API client
export const adminApi = axios.create({
  baseURL: "http://localhost:4000/api/admin",
});

// Patient/User API client
export const userApi = axios.create({
  baseURL: "http://localhost:4000/api/patients",
});

// Auth API client
export const authApi = axios.create({
  baseURL: "http://localhost:4000/api/auth",
});

// Doctor API client
export const doctorApi = axios.create({
  baseURL: "http://localhost:4000/api/auth/doctor", //
});
