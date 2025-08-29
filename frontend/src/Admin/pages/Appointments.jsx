import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";

export default function Appointments() {
  const {
    appointments,
    fetchAppointments,
    addAppointmentPatient, // Changed from addAppointment
    deleteAppointment,
  } = useContext(AppContext);
  const [q, setQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: "", // Changed to match backend expectation
    date: "",
    time: "",
  });

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Search filter
  const filtered = appointments.filter((a) =>
    a.patientId?.name?.toLowerCase().includes(q.toLowerCase())
  );

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAppointmentPatient(formData); // Use the correct function
      setShowModal(false);
      setFormData({ doctorId: "", date: "", time: "" });
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

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
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-solid bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
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
              filtered.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="px-4 py-3">{a.doctorId?.name || a.doctor}</td>
                  <td className="px-4 py-3">
                    {a.patientId?.name || a.patient}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(a.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{a.time}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteAppointment(a._id)}
                      className="text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
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

      {/* Modal for New Appointment */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">New Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Doctor ID"
                value={formData.doctorId}
                onChange={(e) =>
                  setFormData({ ...formData, doctorId: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
