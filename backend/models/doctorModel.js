import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // will be hashed before saving
    },
    image: {
      type: String, // optional profile pic (Cloudinary URL)

      required: false,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String, // e.g. "4 Years"
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    address: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
    },
    available: {
      type: Boolean,
      default: true, // doctor is available by default
    },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    slots_booked: {
      type: Object,
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: { type: String, default: "doctor" },
  },
  { timestamps: true },
  { minimize: false } // to prevent mongoose from removing empty objects
);
const doctorModel =
  mongoose.models.doctor || mongoose.model("Doctor", doctorSchema);
export default doctorModel;
