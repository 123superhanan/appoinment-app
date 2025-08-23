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
// controllers/authController.js - Updated userLogin with detailed logging
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Check password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password mismatch for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
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
    console.error("User login error:", error);
    res.status(500).json({ message: error.message });
  }
};
// ------------------- Doctor Login -------------------

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Create token
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. Remove password before sending doctor data
    const doctorSafe = doctor.toObject();
    delete doctorSafe.password;

    res.status(200).json({ user: doctorSafe, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    } = req.body;
    const image = req.file ? req.file.filename : req.body.image || "";
    // multer handles this

    // Hash password, save doctor in DB with image
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: typeof address === "object" ? address : { line1: address },

      image,
    });

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user: doctor, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ------------------- Logout -------------------
export const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
