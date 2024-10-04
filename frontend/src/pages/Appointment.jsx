import React, { useEffect, useState,  useContext } from 'react';
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const Appointment = () => {


  const {docId} = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);


  const [docInfo, setDocInfo] = useState(null);
  const[docSlot, setDocSlot] = useState([]);
  const[docSlotIndex, setDocSlotIndex] = useState(0);
  const[SlotTime, setSlotTime] = useState('');




  const fetchDocInfo = async  () => {
    const docInfo = doctors.find( doc => doc._id === docId ) 
    setDocInfo(docInfo);
    
    
  }

  const getAvailableSlot = async () => {
    setDocSlot([]);
  
    // Getting current slot
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      // Getting date & time
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
  
      // Set time for appointments
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      // Setting hours (consider time zone and desired starting hour)
      if (today.getDate() === currentDate.getDate()) {
        // Adjust the starting hour based on time zone or user preferences
        currentDate.setHours(10); // Example: Start at 10 AM
      } else {
        currentDate.setHours(30);
      }
      currentDate.setMinutes(0);
  
      let timeSlots = [];
  
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hours: "2-digits", minutes: "2-digits" });
  
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        });
  
        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      setSlotTime(prev => ([...prev, timeSlots]));
    }
  };
  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlot()
  }, [docInfo])

  useEffect(() => {
console.log(docSlot)
  },[docSlot])

  return docInfo && (

    <>
    <div>
     {/* ------------ DOCTORS DETAILS ------------ */}
     <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary rounded-lg w-full sm:max-w-72' src={docInfo.image} alt="" />
        </div>


        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0-mt-[-80px] sm:mt-0  '>
          {/* ---------- DOC INFO: name, degree, experience ---------- */}
          <p className='flex items-center  gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
      

        <div className='flex items-center  gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree}-{docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full hover:bg-black hover:text-white'>{docInfo.experience}</button>
        </div>

        {/* ------ doctor about --------- */}
        <div>
                <p className='flex items-center  gap-1 font-medium text-sm text-gray-900 mt-3 '>
                About <img src={assets.info_icon} alt="" />
                </p>
                
                <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
                  {docInfo.about}
                </p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>Appointment fee : < span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>
      </div>
    </>

  )
}

export default Appointment
