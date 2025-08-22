// routes/authRoutes.js - Your current code is correct
import express from "express";
import {
  userLogin,
  doctorLogin,
  doctorSignup,
  userSignup,
  logout,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

// Patient/Admin signup & login
authRouter.post("/signup", userSignup); // POST /api/auth/signup
authRouter.post("/login", userLogin); // POST /api/auth/login

// Doctor auth routes
authRouter.post("/doctor/login", doctorLogin); // POST /api/auth/doctor/login
authRouter.post("/doctor/signup", doctorSignup); // POST /api/auth/doctor/signup

// Logout
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
