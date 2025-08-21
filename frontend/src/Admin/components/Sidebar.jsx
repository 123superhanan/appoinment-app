import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Calendar, UserPlus, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-5">
      <h1 className="text-xl font-bold mb-6 text-blue-600">Prescripto</h1>
      <nav className="space-y-4">
        <Link
          to="/admin"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link
          to="/admin/appointments"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Calendar size={18} /> Appointments
        </Link>
        <Link
          to="/admin/add-doctor"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <UserPlus size={18} /> Add Doctor
        </Link>
        <Link
          to="/admin/doctors"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Users size={18} /> Doctor List
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
