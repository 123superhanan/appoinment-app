// src/doctor/components/DoctorSidebar.jsx
import { NavLink } from "react-router-dom";

const DoctorSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#5f6fff] text-white p-5 space-y-4">
      <h2 className="text-2xl font-bold">Doctor Panel</h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white/20"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/doctor/appointments"
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white/20"
            }`
          }
        >
          Appointments
        </NavLink>

        <NavLink
          to="/doctor/patients"
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white/20"
            }`
          }
        >
          Patients
        </NavLink>

        <NavLink
          to="/doctor/profile"
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white/20"
            }`
          }
        >
          My Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default DoctorSidebar;
