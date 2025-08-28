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

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({
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

// ------------------- Doctor Login -------------------

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find doctor by email
    const doctor = await doctorModel.findOne({ email });
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
      addressLine1,
      addressLine2,
    } = req.body;

    // 1️⃣ Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // 2️⃣ Validate password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create doctor
    const doctor = await doctorModel.create({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: {
        line1: addressLine1,
        line2: addressLine2,
      },
    });

    // 5️⃣ Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ Return doctor without password
    const doctorSafe = doctor.toObject();
    delete doctorSafe.password;

    res.status(201).json({ user: doctorSafe, token });
  } catch (err) {
    console.error("Doctor signup error:", err);
    res.status(400).json({ message: err.message });
  }
};

// ------------------- Logout -------------------
export const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
