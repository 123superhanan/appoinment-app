import React, { useContext } from "react";
import {
  CalendarCheck2,
  Stethoscope,
  Users,
  ClipboardList,
} from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import { AppContext } from "../../context/AppContext.jsx";

export default function Dashboard() {
  const { doctors, patients, appointments } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Doctors"
          value={doctors.length}
          icon={<Stethoscope size={18} />}
        />
        <StatCard
          label="Appointments"
          value={appointments.length}
          icon={<CalendarCheck2 size={18} />}
        />
        <StatCard
          label="Patients"
          value={patients.length}
          icon={<Users size={18} />}
        />
        <StatCard
          label="Specialities"
          value={new Set(doctors.map((d) => d.speciality)).size}
          icon={<ClipboardList size={18} />}
        />
      </div>

      {/* <div className="card">
        <div className="px-5 py-4 border-b">
          <div className="font-medium text-gray-900">Latest Appointments</div>
        </div>
        <ul className="divide-y">
          {latest.map((item) => (
            <li key={item.id} className="px-5 py-4 flex items-center gap-3">
              <img
                src={item.doctor.image}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="text-sm text-gray-900">
                  {item.doctor.name} <span className="text-gray-400">•</span>{" "}
                  <span className="text-gray-600">{item.patient}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {item.date} — {item.time}
                </div>
              </div>
              <button className="btn btn-ghost">View</button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
