import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // your backend port
  // You can add headers here if needed
});

export default instance;
