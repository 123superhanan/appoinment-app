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
  getPatientAppointments,
} from "../controllers/PatientsController.js";
import { bookAppointment } from "../controllers/PatientsController.js";
const patRouter = express.Router();

patRouter.post("/signup", registerPatient);
patRouter.post("/login", loginPatient);

patRouter.get(
  "/profile",
  authMiddleware,
  authorizeRoles("patient"),
  getPatientProfile
);
patRouter.put(
  "/profile",
  authMiddleware,
  authorizeRoles("patient"),
  updatePatientProfile
);
// patRouter.get(
//   "/appointments",
//   authMiddleware,
//   authorizeRoles("patient"),
//   getPatientAppointments
// );
// patRouter.post(
//   "/appointments",
//   authMiddleware,
//   authorizeRoles("patient"),
//   bookAppointment
// );
export default patRouter;
