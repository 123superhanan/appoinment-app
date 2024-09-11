import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyAppointment from './pages/MyAppointment'
import Login from './pages/Login'
const App = () => {


  return (
    <>
    <div className='mx-4 sm:mx-[10%]'>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/doctors' element={<Doctors/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/about' element={<Login/>} />
      <Route path='/myAppointment' element={<MyAppointment/>} />

    </Routes>
    </div>
    </>
  )
}

export default App
