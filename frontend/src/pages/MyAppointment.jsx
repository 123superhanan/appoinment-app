import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = ({ patientId }) => {
  const { appointments, fetchAppointments } = useContext(AppContext);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const myAppointments = appointments.filter((a) => a.patient === patientId);

  return (
    <div>
      <h2>My Appointments</h2>
      {myAppointments.map((a, i) => (
        <div key={i}>
          <p>Doctor: {a.doctor.name}</p>
          <p>Date: {new Date(a.date).toLocaleDateString()}</p>
          <p>Time: {a.time}</p>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
