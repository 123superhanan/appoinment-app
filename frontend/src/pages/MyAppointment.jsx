import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const {
    appointments,
    fetchAppointments,
    selectAppointmentForPayment,
    getPatientId,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      await fetchAppointments(); // fetch from backend
    };
    loadAppointments();
  }, []);

  useEffect(() => {
    const patientId = getPatientId();
    if (!appointments) return;

    // Filter appointments for logged-in patient
    const filtered = appointments.filter((a) => {
      if (!a.patient) return false;
      // Handle both populated patient objects and raw ObjectId strings
      const pid = a.patient._id ? a.patient._id : a.patient;
      return pid.toString() === patientId;
    });

    setMyAppointments(filtered);
  }, [appointments]);

  if (myAppointments.length === 0)
    return <p className="p-4">No appointments booked yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>

      {myAppointments.map((a) => (
        <div key={a._id} className="border p-4 rounded my-2">
          <p>Doctor: {a.doctor?.name}</p>
          <p>Date: {new Date(a.date).toLocaleDateString()}</p>
          <p>Time: {a.time}</p>
          <p>Status: {a.status}</p>
          {a.status !== "paid" && (
            <button
              className="bg-primary text-white py-1 px-3 rounded mt-2"
              onClick={() => {
                selectAppointmentForPayment(a);
                navigate("/payment");
              }}
            >
              Go to Payment
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
