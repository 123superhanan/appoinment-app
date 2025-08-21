// src/doctor/pages/DoctorLayout.jsx
import React from "react";
import DoctorSidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* nested routes: Dashboard, Appointments, Profile */}
      </div>
    </div>
  );
};

export default DoctorLayout;
