import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"; // admin stored here

// Admin signup
export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await userModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Only superadmin can create another admin
    if (role && role === "admin") {
      const count = await userModel.countDocuments({ role: "admin" });
      if (count >= 1) {
        return res.status(403).json({ message: "Admin already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await userModel.findOne({
      email,
      role: { $in: ["admin", "superadmin"] },
    });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .status(200)
      .json({
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
