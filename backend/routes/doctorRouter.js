import express from "express";
import {
  updateProfile,
  toggleAvailability,
} from "../controllers/doctorController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const doctorRouter = express.Router();

// Doctor management routes (protected)
doctorRouter.put(
  "/profile",
  authMiddleware,
  authorizeRoles("doctor"),
  updateProfile
);

doctorRouter.patch(
  "/availability",
  authMiddleware,
  authorizeRoles("doctor"),
  toggleAvailability
);

export default doctorRouter;
