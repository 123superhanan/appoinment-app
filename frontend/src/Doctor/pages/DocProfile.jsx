import React, { useState } from "react";
import { toast } from "react-toastify";
const DocProfile = () => {
  // doctor info state (replace with API later)
  const [doctor, setDoctor] = useState({
    name: "Dr. Ahmed Khan",
    specialization: "Cardiologist",
    email: "ahmed.khan@hospital.com",
    phone: "+92 300 1234567",
    bio: "Experienced cardiologist with over 10 years of practice in managing heart diseases and preventive healthcare.",
    availability: "Mon - Fri, 10:00 AM - 5:00 PM",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.info("Profile saved successfully! (Later: send to API)");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#5f6fff]">My Profile</h1>
      <p className="text-gray-600">
        Update your personal and professional details below.
      </p>

      <div className="bg-white p-6 rounded-xl shadow border space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={doctor.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={doctor.bio}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff] min-h-[100px]"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Availability
          </label>
          <input
            type="text"
            name="availability"
            value={doctor.availability}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#5f6fff] text-white px-6 py-2 rounded-lg hover:bg-[#4c55e0] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocProfile;
