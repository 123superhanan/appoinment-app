import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: String }, // optional
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    fees: { type: Number, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
    },
    available: { type: Boolean, default: true },
    slots_booked: { type: [Object], default: [] }, // make it array not plain object
    isDeleted: { type: Boolean, default: false },
    role: { type: String, default: "doctor" },
  },
  { timestamps: true, minimize: false }
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default doctorModel;
