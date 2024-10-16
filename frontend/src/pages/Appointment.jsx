import React, { useEffect, useState,  useContext } from 'react';
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedComp from '../components/RelatedComp';

const Appointment = () => {


  const {docId} = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);
  const daysOfWeek = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const [docInfo, setDocInfo] = useState(null);
  const[docSlot, setDocSlot] = useState([]);
  const[docSlotIndex, setDocSlotIndex] = useState(0);
  const[SlotTime, setSlotTime] = useState('');




  const fetchDocInfo = async  () => {
    const docInfo = doctors.find( doc => doc._id === docId ) 
    setDocInfo(docInfo);
    
    
  }

  const getAvailableSlot = () => {
    setDocSlot([]);
    const today = new Date();

    for (let i = 1; i < 7; i++) {
      let currentDate = new Date(today);
      
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(20, 0, 0, 0); // End time is 6:00 PM

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() + i);
      } else {
        currentDate.setHours(9); // Start from 9 AM for future days
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }

      setDocSlot(prev => [...prev, timeSlots]);
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



        {/* --------- booking slots --------*/ }
    <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
              docSlot.length > 0 && docSlot.map((item, index) => (
                  <div onClick={() => setDocSlotIndex(index)} className={` text-center py-6 min-w-[4rem] rounded-full cursor-pointer ${docSlotIndex === index ? " bg-primary text-white" : "border border-gray-200"}`} key={index}>
                      <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                      <p>{item[0] && item[0].dateTime.getDate() }</p>
                  </div>
                ))
            }
            
          </div>
          <div className='w-full flex items-center gap-3 overflow-x-scroll mt-4'>
          {
          docSlot.length > 0 && docSlot[docSlotIndex].map((item, index) => (
          <p onClick={() => setSlotTime(item.time)}  key={index} className={`text-center font-light flex-shrink-0 py-2 px-5  rounded-full cursor-pointer transition-colors duration-200 ${
            item.time   === SlotTime ? 'bg-primary text-white' : 'border border-gray-200'
          }`}>
          { item.time.toLowerCase() }
          </p>
          ))
        }
          </div>
          <button className='bg-primary text-white text-sm font-light py-3 px-14 my-6 rounded-full hover:bg-white hover:text-black hover:border border-gray-400 transition-all 0.5s'>Book an Appoinment</button>
        </div>
       <RelatedComp docId={docId} speciality={docInfo.speciality}/>
      </div>
    </>

  )
}

export default Appointment
