// src/doctor/pages/Appointments.jsx
import React from "react";
import AppointmentCard from "../components/AppointmentCard";
import { appointments } from "../../assets/assets_frontend/assets";

const DocAppointments = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Appointments</h1>
      <div className="space-y-3">
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))}
      </div>
    </div>
  );
};

export default DocAppointments;
