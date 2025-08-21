import express from "express";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import {
  registerPatient,
  loginPatient,
  getPatientProfile,
  updatePatientProfile,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/signup", registerPatient);
router.post("/login", loginPatient);

router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("patient"),
  getPatientProfile
);
router.put(
  "/profile",
  authMiddleware,
  authorizeRoles("patient"),
  updatePatientProfile
);

export default router;
