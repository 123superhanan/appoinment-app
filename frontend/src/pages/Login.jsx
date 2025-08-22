import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up"); // toggle between Sign Up / Login
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const { signup, login } = useAuth(); // only patient auth
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        await signup({ name, email, password, role: "patient", gender });
        toast.success("Signed up successfully!");
        navigate("/"); // redirect after signup
      } else {
        await login({ email, password });
        toast.success("Login successful!");
        navigate("/"); // redirect after login
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "LogIn"}
        </p>
        <p>
          Please <b>{state === "Sign Up" ? "Sign Up" : "LogIn"} </b> to Book
          Your Appointment
        </p>

        {/* Full Name (Only for Sign Up) */}
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* Gender (Only for Sign Up) */}
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Gender</p>
            <select
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white text-md rounded py-2"
        >
          {state === "Sign Up" ? "Create Account" : "LogIn"}
        </button>

        {/* Switch form */}
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("LogIn")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        {/* Doctor links */}
        <p>
          Are you a doctor?{" "}
          <span
            onClick={() => navigate("/doctor-signup")}
            className="text-primary underline cursor-pointer"
          >
            Create Doctor Account
          </span>
        </p>
        <p>
          Already a doctor?{" "}
          <span
            onClick={() => navigate("/doctor-login")}
            className="text-primary underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
