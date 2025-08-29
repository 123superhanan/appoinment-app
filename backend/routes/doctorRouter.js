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
//import { doctorSignup } from "../controllers/authController.js"; // ✅ correct import
import { uploadMiddleware } from "../middlewares/multer.js";

const doctorRouter = express.Router();

// Public route (doctor signup)
// Protected doctor routes
doctorRouter.use(authMiddleware, authorizeRoles("doctor"));

doctorRouter.put("/profile", updateProfile);
doctorRouter.patch("/availability", toggleAvailability);
// doctorRouter.get("/appointments", getAppointments);

export default doctorRouter;
