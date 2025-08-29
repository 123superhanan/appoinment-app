import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedComp from "../components/RelatedComp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, addAppointmentPatient, currencySymbol } =
    useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [docSlotIndex, setDocSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingSlots, setGeneratingSlots] = useState(false);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const { user } = useAuth();
  const patientId = user?._id;
  const navigate = useNavigate();

  useEffect(() => {
    const doc = doctors.find((d) => d._id === docId);
    setDocInfo(doc);
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;

    setGeneratingSlots(true);

    // Simulate slot generation with a slight delay for better UX
    const timer = setTimeout(() => {
      const today = new Date();
      const slots = [];

      for (let i = 1; i <= 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        currentDate.setHours(9, 0, 0, 0);

        let daySlots = [];
        for (let h = 9; h < 20; h++) {
          daySlots.push({
            dateTime: new Date(currentDate),
            time: `${h}:00`,
          });
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        slots.push(daySlots);
      }

      setDocSlot(slots);
      setGeneratingSlots(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [docInfo]);

  const handleBookAppointment = async () => {
    if (!slotTime) return toast.error("Please select a time slot");

    const selectedSlot = docSlot[docSlotIndex].find((s) => s.time === slotTime);
    if (!selectedSlot) return toast.error("Invalid slot");

    setLoading(true);
    try {
      await addAppointmentPatient({
        doctorId: docInfo._id,
        patientId: patientId,
        date: selectedSlot.dateTime.toISOString(),
        time: slotTime,
      });

      setAppointments((prev) => [
        ...prev,
        {
          doctor: docInfo,
          date: selectedSlot.dateTime,
          time: slotTime,
          status: "pending",
        },
      ]);

      toast.success("Appointment booked successfully ✅");
      navigate("/myAppointment");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!docInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    docInfo && (
      <>
        <div className="max-w-6xl mx-auto p-4">
          {/* ------------ DOCTORS DETAILS ------------ */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                className="bg-primary rounded-lg w-full sm:w-72 object-cover h-80"
                src={docInfo.image}
                alt={docInfo.name}
              />
            </div>

            <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
              {/* ---------- DOC INFO: name, degree, experience ---------- */}
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {docInfo.name}
                </h1>
                <img
                  className="w-5 h-5"
                  src={assets.verified_icon}
                  alt="Verified"
                />
              </div>

              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <span className="py-0.5 px-2 border text-xs rounded-full bg-gray-100">
                  {docInfo.experience}
                </span>
              </div>

              {/* ------ doctor about --------- */}
              <div className="mt-4">
                <div className="flex items-center gap-1 font-medium text-gray-900">
                  About{" "}
                  <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
                </div>
                <p className="text-gray-600 mt-1 max-w-[700px]">
                  {docInfo.about}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-gray-700 font-medium">
                  Appointment fee:{" "}
                  <span className="text-primary">
                    {currencySymbol}
                    {docInfo.fees}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* --------- booking slots --------*/}
          <div className="mt-8 sm:ml-80 sm:pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Booking Slots
            </h2>

            {generatingSlots ? (
              <div className="flex justify-center py-10">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-2"></div>
                  <p className="text-gray-500">Loading available slots...</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-3">Select a date</p>
                <div className="flex gap-3 items-center w-full overflow-x-auto py-2">
                  {docSlot.length > 0 &&
                    docSlot.map((item, index) => (
                      <div
                        onClick={() => {
                          setDocSlotIndex(index);
                          setSlotTime("");
                        }}
                        className={`text-center py-4 min-w-[5rem] rounded-lg cursor-pointer transition-all ${
                          docSlotIndex === index
                            ? "bg-primary text-white shadow-md"
                            : "border border-gray-200 hover:border-primary"
                        }`}
                        key={index}
                      >
                        <p className="font-medium">
                          {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                        </p>
                        <p className="text-sm">
                          {item[0] && item[0].dateTime.getDate()}
                        </p>
                      </div>
                    ))}
                </div>

                <p className="text-gray-600 mt-6 mb-3">Select a time</p>
                <div className="w-full flex flex-wrap gap-3 mt-2">
                  {docSlot.length > 0 &&
                    docSlot[docSlotIndex].map((item, index) => (
                      <button
                        onClick={() => setSlotTime(item.time)}
                        key={index}
                        disabled={loading}
                        className={`text-center py-2 px-4 rounded-full cursor-pointer transition-all ${
                          item.time === slotTime
                            ? "bg-primary text-white shadow-md"
                            : "border border-gray-200 hover:border-primary"
                        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {item.time.toLowerCase()}
                      </button>
                    ))}
                </div>

                <button
                  onClick={handleBookAppointment}
                  disabled={!slotTime || loading}
                  className={`mt-6 text-white py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 ${
                    !slotTime || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-secondary"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>

                {!slotTime && (
                  <p className="text-sm text-gray-500 mt-2">
                    Please select a time slot to continue
                  </p>
                )}
              </>
            )}
          </div>

          <RelatedComp docId={docId} speciality={docInfo.speciality} />
        </div>
      </>
    )
  );
};

export default Appointment;
