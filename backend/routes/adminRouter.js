import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  toggleAvailability,
  hardDeleteDoctor,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  hardDeletePatient,
  getAppointments,
  createAppointment,
  deleteAppointment,
} from "../controllers/adminController.js";
import { uploadImage } from "../controllers/uploadController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

// Public endpoints (no auth)
adminRouter.get("/doctors", getDoctors);
adminRouter.get("/patients", getPatients);
adminRouter.post("/upload", uploadImage);

// Protect all routes below
adminRouter.use(authMiddleware, authorizeRoles("admin"));

// Doctor routes (admin only)
adminRouter.post("/doctors", createDoctor);
adminRouter.get("/doctors/:id", getDoctorById);
adminRouter.put("/doctors/:id", updateDoctor);
adminRouter.delete("/doctors/:id", deleteDoctor);
adminRouter.patch("/doctors/:id/availability", toggleAvailability);

// Patient routes
adminRouter.get("/patients/:id", getPatientById);
adminRouter.put("/patients/:id", updatePatient);
adminRouter.delete("/patients/:id", deletePatient);

// Hard delete routes (superadmin only)
adminRouter.delete(
  "/doctors/:id/permanent",
  authorizeRoles("superadmin"),
  hardDeleteDoctor
);
adminRouter.delete(
  "/patients/:id/permanent",
  authorizeRoles("superadmin"),
  hardDeletePatient
);

//Appointment routes
adminRouter.get("/appointments", getAppointments);
adminRouter.post("/appointments", createAppointment);
adminRouter.delete("/appointments/:id", deleteAppointment);

export default adminRouter;
