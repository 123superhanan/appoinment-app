import express from "express";
import {
  doctorLogin,
  updateProfile,
  toggleAvailability,
} from "../controllers/doctorController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const doctorRouter = express.Router();

// Doctor login (public)
doctorRouter.post("/login", doctorLogin);

// Update profile (only doctors themselves)
doctorRouter.put(
  "/profile",
  authMiddleware,
  authorizeRoles("doctor"),
  updateProfile
);

// Toggle availability (only doctors themselves)
doctorRouter.patch(
  "/availability",
  authMiddleware,
  authorizeRoles("doctor"),
  toggleAvailability
);

export default doctorRouter;
