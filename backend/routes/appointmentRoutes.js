import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  bookAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const appointmentRoutes = express.Router();
appointmentRoutes.use(authMiddleware);
appointmentRoutes.post("/", authMiddleware, bookAppointment);
appointmentRoutes.get("/", authMiddleware, getAppointments);
appointmentRoutes.delete("/:id", authMiddleware, deleteAppointment);
appointmentRoutes.patch("/:id/status", authMiddleware, updateAppointmentStatus);

export default appointmentRoutes;
