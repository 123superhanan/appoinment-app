import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
      <div className="p-3 bg-blue-100 text-blue-600 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
