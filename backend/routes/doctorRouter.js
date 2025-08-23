import express from "express";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import {
  updateProfile,
  toggleAvailability,
  getAppointments,
} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Protect all doctor routes
doctorRouter.use(authMiddleware, authorizeRoles("doctor"));

doctorRouter.put("/profile", updateProfile);
doctorRouter.patch("/availability", toggleAvailability);
doctorRouter.get("/appointments", getAppointments);

export default doctorRouter;
