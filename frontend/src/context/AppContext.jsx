import { createContext, useState, useEffect } from "react";
import axios from "axios";

const adminApi = axios.create({
  baseURL: "/api/admin",
});

//  automatically attach token from localStorage
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken"); // <-- must be set after admin login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================== FETCH FUNCTIONS ==================
  const fetchDoctors = async () => {
    try {
      const { data } = await adminApi.get("/doctors"); // use adminApi
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error("Failed to fetch doctors", error.response?.data || error);
      setDoctors([]);
    }
  };

  const fetchPatients = async () => {
    try {
      const { data } = await adminApi.get("/patients"); // ✅ use adminApi
      setPatients(data.patients || []);
    } catch (error) {
      console.error("Failed to fetch patients", error);
      setPatients([]);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data } = await adminApi.get("/appointment"); // ✅ use adminApi
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    }
  };

  // ================== DOCTOR CRUD ==================
  const addDoctor = async (doctorData) => {
    try {
      const { data } = await adminApi.post("/doctors", doctorData);
      setDoctors((prev) => [...prev, data.doctor]);
      return data;
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  const updateDoctor = async (id, updatedData) => {
    try {
      const { data } = await adminApi.put(`/doctors/${id}`, updatedData); // ✅
      setDoctors((prev) => prev.map((doc) => (doc._id === id ? data : doc)));
      return data;
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await adminApi.delete(`/doctors/${id}`); // ✅
      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  const toggleDoctorAvailability = async (id) => {
    try {
      const { data } = await adminApi.patch(`/doctors/${id}/availability`); // ✅
      setDoctors((prev) => prev.map((doc) => (doc._id === id ? data : doc)));
    } catch (err) {
      console.error("Error toggling availability:", err);
    }
  };
  // inside AppContextProvider
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await adminApi.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data; // { url: "..." }
    } catch (err) {
      console.error("Image upload failed:", err);
      throw err;
    }
  };

  // ================== DOCTOR-SIDE (self) ==================

  const toggleOwnAvailability = async () => {
    try {
      const { data } = await adminApi.patch("/api/doctors/availability");
      return data;
    } catch (err) {
      console.error("Error toggling own availability:", err);
    }
  };

  // ================== APPOINTMENTS CRUD ==================
  const addAppointment = async (appointmentData) => {
    try {
      const { data } = await adminApi.post("/appointments", appointmentData);
      setAppointments((prev) => [...prev, data]);
      return data;
    } catch (err) {
      console.error("Error adding appointment:", err);
      throw err;
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await adminApi.delete(`/appointments/${id}`); // ✅
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  const updateDoctorProfile = async (profileData) => {
    try {
      const { data } = await adminApi.put("/api/doctors/profile", profileData);
      return data;
    } catch (err) {
      console.error("Error updating doctor profile:", err);
    }
  };
  // ================== INIT FETCH ==================
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  // ================== CONTEXT VALUE ==================
  const value = {
    currencySymbol,
    loading,

    // doctors (admin side)
    doctors,
    fetchDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    toggleDoctorAvailability,

    // doctors (self side)
    updateDoctorProfile,
    toggleOwnAvailability,

    // patients
    patients,
    fetchPatients,

    // appointments
    appointments,
    fetchAppointments,
    addAppointment,
    deleteAppointment,

    // image upload
    uploadImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
