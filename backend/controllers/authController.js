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
    res
      .status(200)
      .json({
        token,
        user: { id: user._id, role: user.role, name: user.name },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Doctor Login -------------------
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(doctor);
    res
      .status(200)
      .json({ token, doctor: { id: doctor._id, name: doctor.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Patient/ Admin Signup -------------------
export const userSignup = async (req, res) => {
  try {
    const { name, email, password, role = "patient" } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Name, email, password required" });

    const existing = await userModel.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword, role });
    await user.save();

    const token = generateToken(user);
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, name: user.name, role: user.role },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Logout -------------------
export const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
