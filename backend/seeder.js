import dotenv from "dotenv";
import bcrypt from "bcrypt";
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

    // Hash user passwords
    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      }))
    );

    // Hash doctor passwords
    const hashedDoctors = await Promise.all(
      doctors.map(async (d) => ({
        ...d,
        password: await bcrypt.hash(d.password, 10),
      }))
    );

    // Hash admin passwords
    const hashedAdmins = await Promise.all(
      admins.map(async (a) => ({
        ...a,
        password: await bcrypt.hash(a.password, 10),
      }))
    );

    const createdUsers = await userModel.insertMany(hashedUsers);
    const createdDoctors = await doctorModel.insertMany(hashedDoctors);
    await adminModel.insertMany(hashedAdmins);

    // Map appointments to ObjectIds
    const mappedAppointments = appointments.map((app) => {
      const patient = createdUsers.find(
        (u) => u.name.trim() === app.patient.trim()
      );
      const doctor = createdDoctors.find(
        (d) => d.name.trim() === app.doctor.trim()
      );

      if (!patient || !doctor) {
        throw new Error(
          `Could not find match for patient: ${app.patient}, doctor: ${app.doctor}`
        );
      }

      return {
        date: app.date,
        time: app.time,
        status: app.status,
        patient: patient._id,
        doctor: doctor._id,
      };
    });

    await Appointment.insertMany(mappedAppointments);

    console.log(
      "✅ Seeder data inserted with hashed passwords & linked appointments!"
    );
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
