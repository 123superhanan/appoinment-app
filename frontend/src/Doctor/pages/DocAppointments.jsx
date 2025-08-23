// src/doctor/pages/Appointments.jsx
import React, { useContext, useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { AppContext } from "../../context/AppContext";

const DocAppointments = () => {
  const { appointments, fetchAppointments } = useContext(AppContext);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Appointments</h1>
      <div className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <AppointmentCard key={appt._id} appointment={appt} />
          ))
        ) : (
          <p className="text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DocAppointments;
