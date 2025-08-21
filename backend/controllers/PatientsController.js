import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Patient signup
export const registerPatient = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email exists" });

  const user = await userModel.create({ name, email, password });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.status(201).json({ token, user });
};

// Patient login
export const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// Get patient profile
export const getPatientProfile = async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");
  res.json(user);
};

// Update patient profile
export const updatePatientProfile = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  Object.assign(user, req.body); // update fields
  await user.save();
  res.json(user);
};
