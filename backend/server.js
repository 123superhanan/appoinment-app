import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import authRouter from "./routes/authRoutes.js";
import adminAuthRouter from "./routes/adminAuthRoutes.js";
import patRouter from "./routes/patientRoutes.js";
//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());
connectDB();
connectCloudinary();

//api endpoints
app.use("/api/admin/auth", adminAuthRouter); // public auth routes - NO AUTH MIDDLEWARE
app.use("/api/admin", adminRouter); // protected admin routes - WITH AUTH MIDDLEWARE
app.use("/api/doctors", doctorRouter);
app.use("/api/auth", authRouter); // regular user auth routes
app.use("/api/patients", patRouter); // patient routes

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Prescripto backend server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
