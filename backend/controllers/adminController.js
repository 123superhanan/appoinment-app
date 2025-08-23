import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import Appointment from "../models/appointmentModel.js";

// -------------------- DOCTOR CRUD --------------------

// @desc Create new doctor
// @route POST /api/admin/doctors
// @access Admin
export const createDoctor = async (req, res) => {
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
      addressLine1,
      addressLine2,
      image,
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Address handling
    const finalAddress =
      address && address.line1 && address.line2
        ? address
        : { line1: addressLine1 || "", line2: addressLine2 || "" };

    const doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      image, // Use the URL from the upload endpoint
      address: finalAddress,
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors with search, filter, pagination
export const getDoctors = async (req, res) => {
  try {
    const { name, email, speciality, page = 1, limit = 10 } = req.query;

    // Build query
    const query = { isDeleted: { $ne: true } }; // ignore soft-deleted
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (speciality) query.speciality = { $regex: speciality, $options: "i" };

    const doctors = await doctorModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await doctorModel.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update doctor
export const updateDoctor = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const doctor = await doctorModel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor updated", doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete doctor
// Soft delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor soft-deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete patient

// Toggle availability
export const toggleAvailability = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.available = !doctor.available;
    await doctor.save();

    res
      .status(200)
      .json({ message: "Availability updated", available: doctor.available });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const hardDeleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/** patient curd operations**/

// -------------------- PATIENT CRUD --------------------

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const { name, email, page = 1, limit = 10 } = req.query;

    const query = { role: "patient", isDeleted: { $ne: true } };
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };

    const patients = await userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select("-password");

    const total = await userModel.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      patients,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await userModel.findById(req.params.id).select("-password");
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const patient = await userModel
      .findByIdAndUpdate(req.params.id, updates, { new: true })
      .select("-password");

    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient updated", patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete patient
export const deletePatient = async (req, res) => {
  try {
    const patient = await userModel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient soft-deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hardDeletePatient = async (req, res) => {
  try {
    const patient = await userModel.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== GET ALL APPOINTMENTS ==================
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// ================== CREATE NEW APPOINTMENT ==================
export const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, time, status } = req.body;

    if (!patient || !doctor || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAppointment = new Appointment({
      patient,
      doctor,
      date,
      time,
      status: status || "pending", // ✅ default handled here too
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

// ================== DELETE APPOINTMENT ==================
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Failed to delete appointment" });
  }
};
