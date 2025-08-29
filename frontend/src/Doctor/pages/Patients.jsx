import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Phone,
  CalendarDays,
  Eye,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Patients = () => {
  const { patients, fetchPatients, deletePatient, loading } =
    useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm)
  );

  // Get current patients for pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(id);
        // Patients list will update automatically through context
      } catch (error) {
        console.error("Failed to delete patient:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#5f6fff]">Patients</h1>
          <p className="mt-2 text-gray-600">
            List of patients who booked appointments with you.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <button className="bg-[#5f6fff] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#4a58e0]">
            <Plus className="w-5 h-5" />
            New Patient
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow border">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-[#5f6fff] text-white">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Last Appointment</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient, index) => (
                    <tr
                      key={patient._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">
                        {indexOfFirstPatient + index + 1}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#5f6fff]" />
                        {patient.name || "Unknown"}
                      </td>
                      <td className="py-3 px-4">{patient.email || "N/A"}</td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-gray-500" />
                        {patient.phone || "N/A"}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-gray-500" />
                        {formatDate(patient.lastAppointment)}
                      </td>
                      <td className="py-3 px-4 text-center flex justify-center gap-3">
                        <button
                          className="p-2 rounded-lg bg-blue-100 text-[#5f6fff] hover:bg-blue-200"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
                          title="Edit Patient"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                          onClick={() => handleDelete(patient._id)}
                          title="Delete Patient"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      {searchTerm
                        ? "No patients match your search"
                        : "No patients found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredPatients.length > patientsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Patients;
