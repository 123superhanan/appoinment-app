// controllers/adminAuthController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

// Admin signup
export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Limit to 2 admins
    const adminCount = await Admin.countDocuments();
    if (adminCount >= 2) {
      return res.status(403).json({ message: "Maximum 2 admins allowed" });
    }

    // Create admin - password will be hashed by the pre-save middleware
    const admin = await Admin.create({
      name,
      email,
      password, // This will be hashed automatically
      role: "admin",
    });

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Use the matchPassword method from your schema
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
