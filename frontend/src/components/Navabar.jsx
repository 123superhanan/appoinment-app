import React, { useState } from 'react'
import {assets}  from "../assets/assets_frontend/assets"
import { NavLink, useNavigate } from 'react-router-dom'


const Navabar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken ] = useState(true)

  return (
    <>
<div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
    {/* --- logo -- */}
      <img onClick={() => navigate("/")} className='w-44 cursor-pointer' src={assets.logo} alt="" />

      {/* --- NavLinks for routing -- */}
        <ul className='hidden md:flex items-center gap-5 font-medium'>
          <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>

          <NavLink to='/doctors'>
            <li className='py-1'>All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>

          <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>

          <NavLink to='/contact'>
            <li className='py-1 '>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'  />
          </NavLink>
        </ul>

      {/* --- navbar right side -- */}
        <div className='flex items-center justify-center gap-4' >

          {
            token 
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-400 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-5 p-4'>
                  <p  onClick={()=> navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={()=> navigate('/myAppointment')} className='hover:text-black cursor-pointer'>My Appointment</p>
                  <p onClick={()=> setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div> :
            <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hiddeb md:block'>Create Account</button>
          }
          <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
       {/*-------------- mobile menu --------------- */}
       
      
       <div className={`${showMenu ? "fixed w-full" :'h-0 w-0'} md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20 overflow-hidden transition-all`}>
  <div className="flex justify-between p-4">
    <img src={assets.logo} alt="" className="w-24" />
   
      <img  className="w-6 h-6" onClick={() => setShowMenu(false)}  src={assets.cross_icon} alt="" />
    
  </div>
  <ul className="flex flex-col space-y-2 p-4">
    <li className="hover:bg-gray-100 p-2 rounded-md">
      <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
    </li>
    <li className="hover:bg-gray-100 p-2 rounded-md">
      <NavLink onClick={() => setShowMenu(false)} to="/doctors">All Doctors</NavLink>
    </li>
    <li className="hover:bg-gray-100 p-2 rounded-md">
      <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
    </li>
    <li className="hover:bg-gray-100 p-2 rounded-md">
      <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact</NavLink>
    </li>
  </ul>
</div>
        </div>
</div>   
    </>
  )
}

export default Navabar
