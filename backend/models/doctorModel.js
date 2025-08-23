import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    image: { type: String, default: "" }, // Cloudinary URL (optional)

    speciality: { type: String, required: true },
    degree: { type: String, required: false }, // optional
    experience: { type: String, required: false }, // optional
    about: { type: String, required: false }, // optional
    fees: { type: Number, required: false }, // optional

    address: {
      line1: { type: String, required: false },
      line2: { type: String, required: false },
    },

    available: { type: Boolean, default: true },
    slots_booked: { type: [Object], default: [] },

    isDeleted: { type: Boolean, default: false },
    role: { type: String, default: "doctor" },
  },
  { timestamps: true, minimize: false }
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default doctorModel;
