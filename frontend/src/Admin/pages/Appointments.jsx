import React, { useState } from "react";

// Sample doctors list (replace with real data or props)
const doctors = [
  {
    _id: "1",
    name: "Dr. Richard James",
    speciality: "Cardiologist",
    image: "/doctors/doc1.jpg",
  },
  {
    _id: "2",
    name: "Dr. Sarah Lee",
    speciality: "Dermatologist",
    image: "/doctors/doc2.jpg",
  },
];

// Initial mock appointments
const initialAppointments = [
  {
    id: 1,
    doctorId: "1",
    patient: "John Doe",
    date: "2024-08-22",
    time: "10:00 AM",
  },
  {
    id: 2,
    doctorId: "2",
    patient: "Jane Smith",
    date: "2024-08-23",
    time: "2:00 PM",
  },
];

export default function Appointments() {
  const [list, setList] = useState(initialAppointments);
  const [q, setQ] = useState("");

  function doctorById(id) {
    return doctors.find((d) => d._id === id);
  }

  function remove(id) {
    setList((l) => l.filter((x) => x.id !== id));
  }

  const filtered = list.filter((a) =>
    a.patient.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search + New Appointment */}
      <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search patient…"
          className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 w-full md:w-72"
        />
        <button className="btn btn-solid bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
          New Appointment
        </button>
      </div>

      {/* Appointments Table */}
      <div className="card overflow-hidden border rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left font-medium px-4 py-3">Doctor</th>
              <th className="text-left font-medium px-4 py-3">Patient</th>
              <th className="text-left font-medium px-4 py-3">Date</th>
              <th className="text-left font-medium px-4 py-3">Time</th>
              <th className="text-right font-medium px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((a) => {
                const d = doctorById(a.doctorId);
                return (
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={d?.image}
                          alt={d?.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-gray-900 font-medium">
                            {d?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {d?.speciality}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{a.patient}</td>
                    <td className="px-4 py-3">{a.date}</td>
                    <td className="px-4 py-3">{a.time}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => remove(a.id)}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
