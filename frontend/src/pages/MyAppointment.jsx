import { useContext } from "react"
import { AppContext } from "../context/AppContext"


const MyAppointment = () => {
const {doctors} = useContext(AppContext);
  
  return (

    <div className="flex flex-col space-y-4">
    <p className="text-center text-xl font-bold">My Appointments</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doctors.slice(0, 4).map((item, index) => (
        <div key={index} className="flex flex-col rounded-lg shadow-md">
          <div className="flex-grow relative">
            <img src={item.image} alt={item.name} className="object-cover w-45 h-22  rounded-t-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-20 z-10 rounded-t-lg"></div>
          </div>
          <div className="flex flex-col p-4 space-y-2 bg-white rounded-b-lg">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
            <p className="text-sm font-light">Address:</p>
            <p className="text-sm">{item.address.line1}</p>
            <p className="text-sm">{item.address.line2}</p>
            <div className="flex justify-between items-end">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Date & Time:</span> 25 Nov, 2024 | 8:30 PM
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700">Pay Online</button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};


export default MyAppointment
