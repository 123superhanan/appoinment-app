import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import AdminLoader from "../components/AdminLoader";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loading, loginAdmin, signupAdmin } = useContext(AdminAuthContext);

  const [isSignup, setIsSignup] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signupAdmin(name, email, password);
      } else {
        await loginAdmin(email, password);
      }
      navigate("/admin/");
    } catch (err) {
      // error handled in context
    }
  };

  if (loading) return <AdminLoader />;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isSignup ? "Admin Signup" : "Admin Login"}
        </h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />
        )}

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
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          className="text-sm text-center text-gray-500 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an admin? Login here"
            : "Don't have an admin? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
