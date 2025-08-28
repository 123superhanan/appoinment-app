import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const { selectedAppointment, updateAppointmentStatus } =
    useContext(AppContext);
  const navigate = useNavigate();

  if (!selectedAppointment) {
    return <p>No appointment selected for payment.</p>;
  }

  const handlePayment = async () => {
    try {
      await updateAppointmentStatus(selectedAppointment._id, "paid");
      toast.success("Payment successful ✅");
      navigate("/myAppointment"); // go back to MyAppointments
    } catch (err) {
      console.error(err);
      toast.error("Payment failed ❌");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Payment</h2>
      <p>
        <strong>Doctor:</strong> {selectedAppointment.doctor?.name}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(selectedAppointment.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {selectedAppointment.time}
      </p>
      <p>
        <strong>Status:</strong> {selectedAppointment.status}
      </p>
      <p className="mt-4 text-lg">
        <strong>Amount:</strong> ${selectedAppointment.doctor?.fees || 0}
      </p>
      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
