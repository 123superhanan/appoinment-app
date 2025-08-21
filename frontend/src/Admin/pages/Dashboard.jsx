import React from "react";
import {
  CalendarCheck2,
  Stethoscope,
  Users,
  ClipboardList,
} from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import { doctors } from "../../assets/assets_frontend/assets.js";

const latest = [
  {
    id: 1,
    doctor: doctors[0],
    patient: "Alex Carter",
    date: "30 Jun, 2025",
    time: "10:30 AM",
  },
  {
    id: 2,
    doctor: doctors[1],
    patient: "Mia Johnson",
    date: "30 Jun, 2025",
    time: "11:00 AM",
  },
  {
    id: 3,
    doctor: doctors[2],
    patient: "Sam Lee",
    date: "01 Jul, 2025",
    time: "09:15 AM",
  },
  {
    id: 4,
    doctor: doctors[3],
    patient: "Olivia Davis",
    date: "01 Jul, 2025",
    time: "01:45 PM",
  },
];

export default function Dashboard() {
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
          value={latest.length}
          icon={<CalendarCheck2 size={18} />}
        />
        <StatCard label="Patients" value={5} icon={<Users size={18} />} />
        <StatCard
          label="Specialities"
          value={6}
          icon={<ClipboardList size={18} />}
        />
      </div>

      <div className="card">
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
      </div>
    </div>
  );
}
