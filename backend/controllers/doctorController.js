// doctorController.js
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Doctor login
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor updates their profile
export const updateProfile = async (req, res) => {
  try {
    const doctorId = req.user.id; // coming from auth middleware
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const doctor = await doctorModel.findByIdAndUpdate(doctorId, updates, {
      new: true,
    });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Profile updated", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor toggles availability
export const toggleAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id; // doctor must be logged in
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.available = !doctor.available;
    await doctor.save();

    res.status(200).json({
      message: "Availability updated",
      available: doctor.available,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
