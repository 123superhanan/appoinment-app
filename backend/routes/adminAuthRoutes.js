// routes/adminAuthRoutes.js
import express from "express";
import { signupAdmin, loginAdmin } from "../controllers/adminAuthController.js";

const AdminAuthRouter = express.Router();

// Public routes — no token required
// Signup — backend will limit to 2 admins
AdminAuthRouter.post("/signup", signupAdmin);

// Login — anyone with valid credentials can login
AdminAuthRouter.post("/login", loginAdmin);
// Add this line
export default AdminAuthRouter;
