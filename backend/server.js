import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

//api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctors", doctorRouter);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Prescripto backend server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
