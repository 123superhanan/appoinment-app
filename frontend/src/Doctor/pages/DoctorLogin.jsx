import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doctorLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await doctorLogin({ email, password });
      toast.success("Doctor login successful!");
      navigate("/doctor/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold">Doctor Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-primary text-white py-2 rounded-lg mt-2"
      >
        Login
      </button>
    </form>
  );
};

export default DoctorLogin;
