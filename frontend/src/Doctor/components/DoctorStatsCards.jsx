// src/doctor/components/DoctorStatsCards.jsx
import React from "react";
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";

const DoctorStatsCards = () => {
  const stats = [
    {
      title: "Total Appointments",
      value: 120,
      icon: <CalendarDays className="w-6 h-6" />,
      color: "bg-[#5f6fff] text-white",
    },
    {
      title: "Upcoming",
      value: 15,
      icon: <Clock className="w-6 h-6" />,
      color: "bg-green-500 text-white",
    },
    {
      title: "Completed",
      value: 95,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-blue-500 text-white",
    },
    {
      title: "Canceled",
      value: 10,
      icon: <XCircle className="w-6 h-6" />,
      color: "bg-red-500 text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md border"
        >
          <div
            className={`p-3 rounded-full flex items-center justify-center ${item.color}`}
          >
            {item.icon}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">{item.title}</h3>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorStatsCards;
