import React from "react";
import { User, Phone, CalendarDays, Eye, Trash2, Edit } from "lucide-react";

const Patients = () => {
  const patients = [
    {
      id: 1,
      name: "Ali Khan",
      phone: "+92 300 1234567",
      lastAppointment: "2025-08-15",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      phone: "+92 345 9876543",
      lastAppointment: "2025-08-17",
    },
    {
      id: 3,
      name: "Bilal Hussain",
      phone: "+92 321 1112233",
      lastAppointment: "2025-08-18",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#5f6fff]">Patients</h1>
        <p className="mt-2 text-gray-600">
          List of patients who booked appointments with you.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-[#5f6fff] text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Last Appointment</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#5f6fff]" /> {p.name}
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" /> {p.phone}
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-gray-500" />{" "}
                  {p.lastAppointment}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-3">
                  <button className="p-2 rounded-lg bg-blue-100 text-[#5f6fff] hover:bg-blue-200">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
