import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const {
    selectedAppointment,
    updateAppointmentStatus,
    selectAppointmentForPayment,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Check if we have a selected appointment in context
    if (selectedAppointment) {
      setAppointment(selectedAppointment);
    } else {
      // Fallback: check localStorage
      const storedAppointment = localStorage.getItem("selectedAppointment");
      if (storedAppointment) {
        try {
          const parsedAppointment = JSON.parse(storedAppointment);
          setAppointment(parsedAppointment);
          // Restore to context
          selectAppointmentForPayment(parsedAppointment);
        } catch (error) {
          console.error("Error parsing stored appointment:", error);
        }
      }
    }
  }, [selectedAppointment, selectAppointmentForPayment]);

  if (!appointment) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          No Appointment Selected
        </h2>
        <p className="mb-4">
          Please select an appointment from your appointments list to make a
          payment.
        </p>
        <button
          onClick={() => navigate("/myAppointment")}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
        >
          Go to My Appointments
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      await updateAppointmentStatus(appointment._id, "paid");
      toast.success("Payment successful ✅");
      // Clear the selection
      selectAppointmentForPayment(null);
      localStorage.removeItem("selectedAppointment");
      navigate("/myAppointment");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed ❌");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Payment</h2>
      <div className="space-y-3">
        <p>
          <strong>Doctor:</strong> {appointment.doctor?.name}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(appointment.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {appointment.time}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-yellow-600 font-medium">
            {appointment.status}
          </span>
        </p>
        <p className="mt-4 text-lg border-t pt-3">
          <strong>Amount:</strong> ${appointment.doctor?.fees || 0}
        </p>
      </div>
      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
