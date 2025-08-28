import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import MyAppointment from "./pages/MyAppointment";
import Login from "./pages/Login";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Navabar from "./components/Navabar";
import Footer from "./components/Footer";

//admin imports
import AdminLayout from "./Admin/pages/AdminLayout";
import Dashboard from "./Admin/pages/Dashboard";
import Appointments from "./Admin/pages/Appointments";
import AddDoctor from "./Admin/pages/AddDoctor";
import DoctorList from "./Admin/pages/DoctorList";
import PrivateRoute from "./Admin/components/PrivateRoute";
import AdminLogin from "./Admin/pages/AdminLogin";
import AdminLoader from "./Admin/components/AdminLoader";

//doctor imports
import DoctorLayout from "./Doctor/pages/DoctorLayout";
import DoctorDashboard from "./Doctor/pages/DoctorDashboard";
import DocAppointments from "./Doctor/pages/DocAppointments";
import Patients from "./Doctor/pages/Patients";
import Profile from "./Doctor/pages/DocProfile";
import DoctorRoute from "./Doctor/components/DoctorRoute";

//toasify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorSignup from "./Doctor/pages/DoctorSignup";
import DoctorLogin from "./Doctor/pages/DoctorLogin";
import Payment from "./pages/Payment";
const App = () => {
  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <Navabar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myAppointment" element={<MyAppointment />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="doctor-login" element={<DoctorLogin />} />
          <Route path="doctor-signup" element={<DoctorSignup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/payment" element={<Payment />} />
          {/* --- Admin --- */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="appointments" element={<Appointments />} />
          </Route>

          <Route
            path="/doctor/*"
            element={
              <DoctorRoute>
                <DoctorLayout />
              </DoctorRoute>
            }
          >
            <Route index element={<DoctorDashboard />} />
            <Route path="appointments" element={<DocAppointments />} />
            <Route path="patients" element={<Patients />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: "#000", // black background
            color: "#fff", // white text
            border: "none", // no border
            borderRadius: "8px", // optional rounded look
            padding: "12px 20px",
          }}
        />

        <Footer />
      </div>
    </>
  );
};

export default App;
