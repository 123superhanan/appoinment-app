import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyAppointment from './pages/MyAppointment'
import Login from './pages/Login'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navabar from './components/Navabar'
import Footer from './components/Footer'


const App = () => {


  return (
    <>
    <div className='mx-4 sm:mx-[10%]'>
<Navabar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/doctors' element={<Doctors/>} />
      <Route path='/doctors/:speciality' element={<Doctors/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/myAppointment' element={<MyAppointment/>} />
      <Route path='/appointment/:docId' element={<Appointment/>} />
      <Route path='/about' element={<About />} />
      <Route path='/my-profile' element={<MyProfile />} />
    </Routes>
<Footer />

    </div>
    </>
  )
}

export default App
