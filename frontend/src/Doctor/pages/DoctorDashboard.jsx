import React from "react";
import DoctorStatsCards from "../components/DoctorStatsCards";

const DoctorDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#5f6fff]">Doctor Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your appointments and activities.
        </p>
      </div>

      {/* Stats Cards */}
      <DoctorStatsCards />

      {/* Future sections (Appointments table, etc.) */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Recent Appointments
        </h2>
        <p className="text-gray-500">No recent data available...</p>
      </div>
    </div>
  );
};

export default DoctorDashboard;
