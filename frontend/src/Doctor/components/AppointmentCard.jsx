// src/doctor/components/AppointmentCard.jsx
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const AppointmentCard = ({ appointment }) => {
  const { updateAppointmentStatus } = useContext(AppContext);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateAppointmentStatus(appointment._id, newStatus);
      // The context will automatically update the appointments list
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
      <div>
        <p className="font-semibold text-black">{appointment.patientName}</p>
        <p className="text-gray-500 text-sm">
          {new Date(appointment.date).toLocaleDateString()} at{" "}
          {appointment.time}
        </p>
        <p className="text-sm text-gray-600">Status: {appointment.status}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleStatusUpdate("confirmed")}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Accept
        </button>
        <button
          onClick={() => handleStatusUpdate("cancelled")}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
        <button
          onClick={() => handleStatusUpdate("rescheduled")}
          className="bg-[#5f6fff] text-white px-3 py-1 rounded"
        >
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
