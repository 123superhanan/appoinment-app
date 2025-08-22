import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    patient: { type: String, required: true }, // later we can link to User with ref
    doctor: { type: String, required: true }, // later we can link to Doctor with ref
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
