import express from "express";
import {
  userLogin,
  doctorLogin,
  userSignup,
  logout,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

// Patient/Admin signup & login
authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);

// Doctor login
authRouter.post("/doctor/login", doctorLogin);

// Logout (optional, mainly frontend deletes token)
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
