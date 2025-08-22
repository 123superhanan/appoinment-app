import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// ------------------- Admin/Patient Login -------------------
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Doctor Login -------------------

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email }); // Don't log password

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      console.log("Doctor not found for email:", email);
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      console.log("Password mismatch for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Rest of your code...
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Patient/Admin Signup -------------------
export const userSignup = async (req, res) => {
  try {
    const { name, email, password, role = "patient", gender } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, password required" });
    }

    const existing = await userModel.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      gender,
    });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add to authController.js
export const doctorSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      qualifications,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existing = await doctorModel.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      qualifications: qualifications || "",
    });
    await doctor.save();

    const token = generateToken(doctor);
    res.status(201).json({
      token,
      user: {
        id: doctor._id,
        name: doctor.name,
        role: "doctor",
        email: doctor.email,
        speciality: doctor.speciality,
        degree: doctor.degree,
        experience: doctor.experience,
        about: doctor.about,
        fees: doctor.fees,
        address: doctor.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ------------------- Logout -------------------
export const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
