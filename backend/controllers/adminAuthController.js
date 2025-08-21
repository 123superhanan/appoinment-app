import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signupAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin)
    return res.status(400).json({ message: "Admin already exists" });

  const admin = await Admin.create({ name, email, password });

  res.status(201).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    token: generateToken(admin._id),
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
