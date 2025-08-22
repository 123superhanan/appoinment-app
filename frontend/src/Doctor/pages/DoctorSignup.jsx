import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [image, setImage] = useState(""); // Add this state
  const { doctorSignup } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await doctorSignup({
        name,
        email,
        password,
        image,
        speciality,
        degree,
        experience,
        about,
        fees,
        address: { line1: addressLine1, line2: addressLine2 },
      });

      toast.success("Doctor account created!");
      navigate("/doctor/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold">Doctor Sign Up</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
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
      <input
        type="text"
        placeholder="Speciality (e.g. Cardiologist)"
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Degree (e.g. MBBS, FCPS)"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Experience (e.g. 5 Years)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <textarea
        placeholder="About (short bio)"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Fees"
        value={fees}
        onChange={(e) => setFees(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Address Line 1"
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Address Line 2"
        value={addressLine2}
        onChange={(e) => setAddressLine2(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-primary text-white py-2 rounded-lg mt-2"
      >
        Create Doctor Account
      </button>
    </form>
  );
};

export default DoctorSignup;
