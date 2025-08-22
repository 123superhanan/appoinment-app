// src/utils/axiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:4000", // make sure this points to your backend
  // No Authorization header here
});

export default axiosPublic;
