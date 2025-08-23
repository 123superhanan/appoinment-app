import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Patient signup
export const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await userModel.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Patient already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "patient",
    });

    await patient.save();

    const token = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      patient: { id: patient._id, name: patient.name, email: patient.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Patient login
// Patient login
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await userModel.findOne({ email, role: "patient" });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      patient: {
        _id: patient._id, // ✅ Include _id (not just id)
        id: patient._id, // ✅ Also include id for backward compatibility
        name: patient.name,
        email: patient.email,
        role: patient.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get patient profile
export const getPatientProfile = async (req, res) => {
  const patient = await userModel.findById(req.user.id).select("-password");
  res.status(200).json(patient);
};

// Update patient profile
export const updatePatientProfile = async (req, res) => {
  const updates = req.body;
  if (updates.password)
    updates.password = await bcrypt.hash(updates.password, 10);

  const patient = await userModel
    .findByIdAndUpdate(req.user.id, updates, { new: true })
    .select("-password");
  res.status(200).json(patient);
};
