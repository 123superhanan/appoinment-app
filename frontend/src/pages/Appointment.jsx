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
  const [SlotTime, setSlotTime] = useState("");
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
  }, [docInfo]);

  const handleBookAppointment = async () => {
    if (!SlotTime) return toast.error("Please select a time slot");

    const selectedSlot = docSlot[docSlotIndex].find((s) => s.time === SlotTime);
    if (!selectedSlot) return toast.error("Invalid slot");

    try {
      await addAppointmentPatient({
        doctorId: docInfo._id, // must be doctorId
        date: selectedSlot.dateTime.toISOString(),
        time: SlotTime,
      });

      setAppointments((prev) => [
        ...prev,
        {
          doctor: docInfo,
          date: selectedSlot.dateTime,
          time: SlotTime,
          status: "pending",
        },
      ]);

      toast.success("Appointment booked successfully ✅");
      navigate("/myAppointment");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment ❌");
    }
  };

  if (!docInfo) return null;

  return (
    docInfo && (
      <>
        <div>
          {/* ------------ DOCTORS DETAILS ------------ */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img
                className="bg-primary rounded-lg w-full sm:max-w-72"
                src={docInfo.image}
                alt=""
              />
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0-mt-[-80px] sm:mt-0  ">
              {/* ---------- DOC INFO: name, degree, experience ---------- */}
              <p className="flex items-center  gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}{" "}
                <img className="w-5" src={assets.verified_icon} alt="" />
              </p>

              <div className="flex items-center  gap-2 text-sm mt-1 text-gray-600">
                <p>
                  {docInfo.degree}-{docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full hover:bg-black hover:text-white">
                  {docInfo.experience}
                </button>
              </div>

              {/* ------ doctor about --------- */}
              <div>
                <p className="flex items-center  gap-1 font-medium text-sm text-gray-900 mt-3 ">
                  About <img src={assets.info_icon} alt="" />
                </p>

                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                  {docInfo.about}
                </p>
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fee :{" "}
                <span className="text-gray-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>

          {/* --------- booking slots --------*/}
          <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
            <p>Booking Slots</p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlot.length > 0 &&
                docSlot.map((item, index) => (
                  <div
                    onClick={() => setDocSlotIndex(index)}
                    className={` text-center py-6 min-w-[4rem] rounded-full cursor-pointer ${
                      docSlotIndex === index
                        ? " bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                  </div>
                ))}
            </div>
            <div className="w-full flex items-center gap-3 overflow-x-scroll mt-4">
              {docSlot.length > 0 &&
                docSlot[docSlotIndex].map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    key={index}
                    className={`text-center font-light flex-shrink-0 py-2 px-5  rounded-full cursor-pointer transition-colors duration-200 ${
                      item.time === SlotTime
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>
            <button
              onClick={handleBookAppointment}
              className="bg-primary text-white text-sm font-light py-3 px-14 my-6 rounded-full hover:bg-white hover:text-black hover:border border-gray-400 transition-all 0.5s"
            >
              Book an Appoinment
            </button>
          </div>
          <RelatedComp docId={docId} speciality={docInfo.speciality} />
        </div>
      </>
    )
  );
};

export default Appointment;
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { useAuth } from "../context/AuthContext";
// import { assets } from "../assets/assets_frontend/assets";
// import RelatedComp from "../components/RelatedComp";
// import { toast } from "react-toastify";

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, addAppointmentPatient } = useContext(AppContext);
//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlot, setDocSlot] = useState([]);
//   const [docSlotIndex, setDocSlotIndex] = useState(0);
//   const [SlotTime, setSlotTime] = useState("");
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   useEffect(() => {
//     const doc = doctors.find((d) => d._id === docId);
//     setDocInfo(doc);
//   }, [doctors, docId]);

//   useEffect(() => {
//     if (!docInfo) return;

//     const today = new Date();
//     const slots = [];

//     for (let i = 1; i <= 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);
//       currentDate.setHours(9, 0, 0, 0);

//       let daySlots = [];
//       for (let h = 9; h < 20; h++) {
//         daySlots.push({
//           dateTime: new Date(currentDate),
//           time: `${h}:00`,
//         });
//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }
//       slots.push(daySlots);
//     }

//     setDocSlot(slots);
//   }, [docInfo]);

//   const handleBookAppointment = async () => {
//     if (!SlotTime) return toast.error("Please select a time slot");

//     const selectedSlot = docSlot[docSlotIndex].find((s) => s.time === SlotTime);
//     if (!selectedSlot) return toast.error("Invalid slot");

//     try {
//       await addAppointmentPatient({
//         doctorId: docInfo._id, // backend expects ID
//         doctorInfo: docInfo, // frontend display
//         date: selectedSlot.dateTime.toISOString(),
//         time: SlotTime,
//       });
//       navigate("/myAppointment");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!docInfo) return null;

//   return (
//     <div>
//       {/* Doctor Details */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div>
//           <img
//             className="bg-primary rounded-lg w-full sm:max-w-72"
//             src={docInfo.image}
//             alt=""
//           />
//         </div>
//         <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0-mt-[-80px] sm:mt-0">
//           <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//             {docInfo.name}{" "}
//             <img className="w-5" src={assets.verified_icon} alt="" />
//           </p>
//           <p className="text-gray-500 font-medium mt-4">
//             Appointment fee: {docInfo.fees}
//           </p>
//         </div>
//       </div>

//       {/* Booking Slots */}
//       <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
//         <p>Booking Slots</p>
//         <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//           {docSlot.length > 0 &&
//             docSlot.map((item, index) => (
//               <div
//                 onClick={() => setDocSlotIndex(index)}
//                 key={index}
//                 className={`text-center py-6 min-w-[4rem] rounded-full cursor-pointer ${
//                   docSlotIndex === index
//                     ? "bg-primary text-white"
//                     : "border border-gray-200"
//                 }`}
//               >
//                 <p>{daysOfWeek[item[0].dateTime.getDay()]}</p>
//                 <p>{item[0].dateTime.getDate()}</p>
//               </div>
//             ))}
//         </div>
//         <div className="w-full flex items-center gap-3 overflow-x-scroll mt-4">
//           {docSlot.length > 0 &&
//             docSlot[docSlotIndex].map((item, index) => (
//               <p
//                 onClick={() => setSlotTime(item.time)}
//                 key={index}
//                 className={`text-center font-light flex-shrink-0 py-2 px-5 rounded-full cursor-pointer transition-colors duration-200 ${
//                   item.time === SlotTime
//                     ? "bg-primary text-white"
//                     : "border border-gray-200"
//                 }`}
//               >
//                 {item.time}
//               </p>
//             ))}
//         </div>
//         <button
//           onClick={handleBookAppointment}
//           className="bg-primary text-white text-sm font-light py-3 px-14 my-6 rounded-full hover:bg-white hover:text-black hover:border border-gray-400 transition-all"
//         >
//           Book Appointment
//         </button>
//       </div>

//       <RelatedComp docId={docId} speciality={docInfo.speciality} />
//     </div>
//   );
// };

// export default Appointment;
