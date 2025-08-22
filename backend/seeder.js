import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { users, doctors, appointments, admins } from "./data/mockData.js";
import userModel from "./models/userModel.js";
import doctorModel from "./models/doctorModel.js";
import Appointment from "./models/appointmentModel.js";
import adminModel from "./models/adminModel.js";

dotenv.config();

// connect using central db config
await connectDB();

const importData = async () => {
  try {
    await userModel.deleteMany();
    await doctorModel.deleteMany();
    await Appointment.deleteMany();
    await adminModel.deleteMany();

    await userModel.insertMany(users);
    await doctorModel.insertMany(doctors);
    await Appointment.insertMany(appointments);
    await adminModel.insertMany(admins);

    console.log("✅ Seeder data inserted!");
    process.exit();
  } catch (error) {
    console.error("❌ Error with seeding:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await userModel.deleteMany();
    await doctorModel.deleteMany();
    await Appointment.deleteMany();
    await adminModel.deleteMany();

    console.log("🔥 All data destroyed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error destroying data:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
