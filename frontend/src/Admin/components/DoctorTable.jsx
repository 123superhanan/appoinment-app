import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function DoctorTable() {
  const { doctors, deleteDoctor } = useContext(AppContext);

  return (
    <div className="card overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="text-left font-medium px-4 py-3">Doctor</th>
            <th className="text-left font-medium px-4 py-3">Speciality</th>
            <th className="text-left font-medium px-4 py-3">Experience</th>
            <th className="text-left font-medium px-4 py-3">Fees</th>
            <th className="text-right font-medium px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id} className="border-t">
              <td className="px-4 py-3 flex items-center gap-3">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-xs text-gray-500">{doc.degree}</div>
                </div>
              </td>
              <td className="px-4 py-3">{doc.speciality}</td>
              <td className="px-4 py-3">{doc.experience}</td>
              <td className="px-4 py-3">${doc.fees}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => deleteDoctor(doc._id)}
                  className="btn btn-ghost text-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
