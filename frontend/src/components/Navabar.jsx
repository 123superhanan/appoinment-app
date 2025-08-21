import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  function handleLogout() {
    logout();
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/login"); // optional → redirect to login
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* --- logo --- */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* --- NavLinks (hide for admin & doctor) --- */}
      {user?.role !== "admin" && user?.role !== "doctor" && (
        <ul className="hidden md:flex items-center gap-5 font-medium">
          <NavLink to="/">
            <li className="py-1">Home</li>
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1">All Doctors</li>
          </NavLink>
          <NavLink to="/about">
            <li className="py-1">About</li>
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1">Contact</li>
          </NavLink>
        </ul>
      )}

      {/* --- navbar right side --- */}
      <div className="flex items-center justify-center gap-4">
        {user ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />

            {/* dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-400 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-5 p-4">
                {user.role === "admin" ? (
                  <>
                    <p
                      onClick={() => navigate("/admin")}
                      className="hover:text-black cursor-pointer"
                    >
                      Admin Dashboard
                    </p>
                  </>
                ) : user.role === "doctor" ? (
                  <>
                    <p
                      onClick={() => navigate("/doctor")}
                      className="hover:text-black cursor-pointer"
                    >
                      Doctor Dashboard
                    </p>
                    {/* <p
                      onClick={() => navigate("/doctor/patients")}
                      className="hover:text-black cursor-pointer"
                    >
                      My Patients
                    </p> */}
                  </>
                ) : (
                  <>
                    <p
                      onClick={() => navigate("/my-profile")}
                      className="hover:text-black cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/myAppointment")}
                      className="hover:text-black cursor-pointer"
                    >
                      My Appointment
                    </p>
                  </>
                )}
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* mobile menu toggle (only for normal users) */}
        {user?.role !== "admin" && user?.role !== "doctor" && (
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden"
            src={assets.menu_icon}
            alt="menu"
          />
        )}

        {/* mobile menu (only for normal users) */}
        {user?.role !== "admin" && user?.role !== "doctor" && (
          <div
            className={`${
              showMenu ? "fixed w-full" : "h-0 w-0"
            } md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20 overflow-hidden transition-all`}
          >
            <div className="flex justify-between p-4">
              <img src={assets.logo} alt="logo" className="w-24" />
              <img
                className="w-6 h-6"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="close"
              />
            </div>
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <NavLink onClick={() => setShowMenu(false)} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                  All Doctors
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setShowMenu(false)} to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setShowMenu(false)} to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
