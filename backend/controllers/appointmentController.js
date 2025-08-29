import Appointment from "../models/appointmentModel.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id;
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      status: "pending",
    });
    await appointment.save();
    if (!doctorId || !date || !time) {
      return res
        .status(400)
        .json({ message: "Doctor, date and time are required" });
    }

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No patient found in token" });
    }

    const newAppt = await Appointment.create({
      patient: req.user.id, // ✅ will throw if missing
      doctor: doctorId,
      date,
      time,
      status: "pending",
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppt,
    });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res
      .status(500)
      .json({ message: err.message || "Error booking appointment" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name speciality");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating appointment" });
  }
};
