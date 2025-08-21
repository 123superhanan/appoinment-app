// src/doctor/components/AppointmentCard.jsx
import React from "react";

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
      <div>
        <p className="font-semibold text-black">{appointment.patient}</p>
        <p className="text-gray-500 text-sm">
          {appointment.date} at {appointment.time}
        </p>
      </div>

      <div className="flex gap-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded">
          Accept
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded">
          Reject
        </button>
        <button className="bg-[#5f6fff] text-white px-3 py-1 rounded">
          Delay
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
