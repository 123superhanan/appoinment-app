import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const {
    appointments,
    fetchAppointments,
    selectAppointmentForPayment,
    getPatientId,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        await fetchAppointments(); // just fetch + store in context
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, [fetchAppointments]);

  // now filter when appointments OR patientId changes
  useEffect(() => {
    const patientId = getPatientId();
    if (!appointments || !patientId) {
      setMyAppointments([]);
      return;
    }

    const filtered = appointments.filter((a) => {
      if (!a.patient) return false;
      const patientIdValue =
        typeof a.patient === "object" ? a.patient._id : a.patient;
      return (
        patientIdValue && patientIdValue.toString() === patientId.toString()
      );
    });

    setMyAppointments(filtered);
  }, [appointments, getPatientId]);

  // if (loading) {
  //   return (
  //     <div className="p-4 flex flex-col items-center justify-center min-h-[300px]">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
  //       <p className="text-gray-600">Loading your appointments...</p>
  //     </div>
  //   );
  // }

  if (myAppointments.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="max-w-md mx-auto py-12">
          <div className="text-5xl text-gray-200 mb-6">
            <i className="far fa-calendar-alt"></i>
          </div>
          <h3 className="text-xl font-medium text-gray-500 mb-3">
            No appointments yet
          </h3>
          <p className="text-gray-400 mb-8">
            It looks like you haven't booked any appointments yet.
          </p>
          <button
            className="bg-primary hover:bg-secondary text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            onClick={() => navigate("/doctors")}
          >
            Book Your First Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
        <button
          className="bg-primary hover:bg-secondary text-white text-sm font-medium py-2 px-4 rounded shadow-sm"
          onClick={() => navigate("/doctors")}
        >
          <i className="fas fa-plus mr-2"></i>New Appointment
        </button>
      </div>

      <div className="space-y-5">
        {myAppointments.map((a) => (
          <div
            key={a._id}
            className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-md text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {a.doctor?.name}
                    </h3>
                    <p className="text-gray-600">
                      {a.doctor?.speciality || "General Practice"}
                    </p>
                    <div className="flex items-center mt-3 text-gray-500">
                      <i className="far fa-calendar-alt mr-2"></i>
                      <span className="mr-4">
                        {new Date(a.date).toLocaleDateString()}
                      </span>
                      <i className="far fa-clock mr-2"></i>
                      <span>{a.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    a.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : a.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                </span>

                {a.status !== "paid" && (
                  <button
                    className="bg-primary hover:bg-secondary text-white font-medium py-2 px-5 rounded-lg transition-colors flex items-center"
                    onClick={() => {
                      selectAppointmentForPayment(a);
                      navigate("/payment");
                    }}
                  >
                    <i className="fas fa-credit-card mr-2"></i>
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
