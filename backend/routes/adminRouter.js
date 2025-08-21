import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  toggleAvailability,
  hardDeleteDoctor,
} from "../controllers/adminController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
const adminRouter = express.Router();
// pateints routes
import {
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  hardDeletePatient,
} from "../controllers/adminController.js";
// Protect all admin routes
adminRouter.use(authMiddleware, authorizeRoles("admin"));

// Doctor routes
adminRouter.post("/doctors", createDoctor);
adminRouter.get("/doctors", getDoctors);
adminRouter.get("/doctors/:id", getDoctorById);
adminRouter.put("/doctors/:id", updateDoctor);
adminRouter.delete("/doctors/:id", deleteDoctor);
adminRouter.patch("/doctors/:id/availability", toggleAvailability);

// Patient routes
adminRouter.get("/patients", getPatients);
adminRouter.get("/patients/:id", getPatientById);
adminRouter.put("/patients/:id", updatePatient);
adminRouter.delete("/patients/:id", deletePatient);

//hard delete routes
adminRouter.delete(
  "/doctors/:id/permanent",
  authMiddleware,
  authorizeRoles("superadmin"),
  hardDeleteDoctor
);
adminRouter.delete(
  "/patients/:id/permanent",
  authMiddleware,
  authorizeRoles("superadmin"),
  hardDeletePatient
);
export default adminRouter;
