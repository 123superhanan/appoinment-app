import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ browser-friendly JWT parser
// AdminAuthContext.jsx
import { adminApi } from "../utils/axios";
import { userApi } from "../utils/axios";
import { toast } from "react-toastify";
import { doctorApi } from "../utils/axios";
import { appointmentApi } from "../utils/axios";
// Automatically attach admin token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically attach user token
userApi.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("userToken") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically attach doctor token
doctorApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("doctorToken");
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
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // ================== AUTH FUNCTIONS ==================
  const getCurrentUser = () => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken =
      localStorage.getItem("userToken") || localStorage.getItem("token");
    const doctorToken = localStorage.getItem("doctorToken");

    if (adminToken) return { role: "admin", token: adminToken };
    if (userToken) return { role: "patient", token: userToken };
    if (doctorToken) return { role: "doctor", token: doctorToken };
    return null;
  };

  const getPatientId = () => {
    // First try to get from dedicated storage
    const patientId = localStorage.getItem("patientId");
    if (patientId) return patientId;

    // Then try to get from userData
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed._id || parsed.id;
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    // Finally, check if there's a token and decode it
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ safe decode
        return decoded.id || decoded._id;
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }

    return null;
  };

  // ================== FETCH FUNCTIONS ==================
  const fetchDoctors = async () => {
    try {
      const { data } = await adminApi.get("/doctors"); // ✅ FIXED
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error("Failed to fetch doctors", error.response?.data || error);
      setDoctors([]);
    }
  };

  const fetchPatients = async () => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "admin") return;

      const { data } = await adminApi.get("/patients");
      setPatients(data.patients || []);
    } catch (error) {
      console.error("Failed to fetch patients", error);
      setPatients([]);
    }
  };

  // ===============================
  // Appointments API Functions
  // ===============================

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const { data } = await appointmentApi.get("/", {
        headers: { Authorization: `Bearer ${token}` },
        params: { t: Date.now() }, // prevent caching
      });

      // Handle both array and object responses
      const appointments = Array.isArray(data)
        ? data
        : data?.appointments || [];

      setAppointments(appointments);
      return appointments;
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
      return [];
    }
  };

  const addAppointmentPatient = async ({ doctorId, date, time }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const { data } = await appointmentApi.post(
        "/",
        { doctorId, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // After successful booking, refresh appointments
      await fetchAppointments();

      toast.success("Appointment booked successfully ✅");
      return data.appointment;
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast.error(
        err.response?.data?.message || "Failed to book appointment ❌"
      );
      throw err;
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const user = getCurrentUser();

      if (user?.role === "admin") {
        await adminApi.delete(`/appointments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await appointmentApi.delete(`/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setAppointments((prev) => prev.filter((app) => app._id !== id));
      toast.success("Appointment deleted ✅");
      return { success: true };
    } catch (err) {
      console.error("Error deleting appointment:", err);
      toast.error("Failed to delete appointment ❌");
      throw err;
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const user = getCurrentUser();
      let response;

      if (user?.role === "admin") {
        response = await adminApi.patch(
          `/appointments/${id}/status`,
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await appointmentApi.patch(
          `/${id}/status`,
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const data = response.data;

      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? { ...appt, status } : appt))
      );

      toast.success("Appointment updated ✅");
      return data;
    } catch (err) {
      console.error("Error updating appointment status:", err);
      toast.error("Failed to update appointment ❌");
      throw err;
    }
  };

  // ================== UPLOAD FUNCTION ==================
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const user = getCurrentUser();
      const api = user?.role === "admin" ? adminApi : userApi;

      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    } catch (err) {
      console.error("Image upload failed:", err);
      throw err;
    }
  };
  const selectAppointmentForPayment = (appt) => {
    setSelectedAppointment(appt);
    // Store in localStorage for persistence
    if (appt) {
      localStorage.setItem("selectedAppointment", JSON.stringify(appt));
    } else {
      localStorage.removeItem("selectedAppointment");
    }
  };
  // ================== DOCTOR CRUD (Admin only) ==================
  const addDoctor = async (doctorData) => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "admin") {
        throw new Error("Only admin can add doctors");
      }

      const { data } = await adminApi.post("/doctors", doctorData);
      setDoctors((prev) => [...prev, data.doctor]);
      return data;
    } catch (err) {
      console.error("Error adding doctor:", err);
      throw err;
    }
  };

  const updateDoctor = async (id, doctorData) => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "admin") {
        throw new Error("Only admin can update doctors");
      }

      const { data } = await adminApi.put(`/doctors/${id}`, doctorData); // ✅ FIXED plural
      setDoctors((prev) =>
        prev.map((doctor) => (doctor._id === id ? data.doctor : doctor))
      );
      return data;
    } catch (err) {
      console.error("Error updating doctor:", err);
      throw err;
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "admin") {
        throw new Error("Only admin can delete doctors");
      }

      await adminApi.delete(`/doctors/${id}`);
      setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting doctor:", err);
      throw err;
    }
  };

  // ================== DOCTOR PROFILE FUNCTIONS ==================
  const updateDoctorProfile = async (doctorData) => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "doctor") {
        throw new Error("Only doctors can update their profile");
      }

      const { data } = await doctorApi.put("/profile", doctorData);
      return data;
    } catch (err) {
      console.error("Error updating doctor profile:", err);
      throw err;
    }
  };

  const toggleDoctorAvailability = async (isAvailable) => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "doctor") {
        throw new Error("Only doctors can update their availability");
      }

      const { data } = await doctorApi.patch("/availability", { isAvailable });
      return data;
    } catch (err) {
      console.error("Error toggling doctor availability:", err);
      throw err;
    }
  };

  const getDoctorAppointments = async () => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "doctor") {
        throw new Error("Only doctors can view their appointments");
      }

      const { data } = await doctorApi.get("/appointments");
      setAppointments(data.appointments || []);
      return data;
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
      throw err;
    }
  };

  // ================== PATIENT FUNCTIONS (Admin only) ==================
  const updatePatient = async (id, patientData) => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "admin") {
        throw new Error("Only admin can update patients");
      }

      const { data } = await adminApi.put(`/patients/${id}`, patientData);
      setPatients((prev) =>
        prev.map((patient) => (patient._id === id ? data.patient : patient))
      );
      return data;
    } catch (err) {
      console.error("Error updating patient:", err);
      throw err;
    }
  };

  const deletePatient = async (id) => {
    try {
      const user = getCurrentUser();
      if (user?.role !== "admin") {
        throw new Error("Only admin can delete patients");
      }

      await adminApi.delete(`/patients/${id}`);
      setPatients((prev) => prev.filter((patient) => patient._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting patient:", err);
      throw err;
    }
  };
  const handlePayment = async () => {
    try {
      await updateAppointmentStatus(selectedAppointment._id, "paid");
      toast.success("Payment successful ✅");
      // Clear selection
      selectAppointmentForPayment(null);
      navigate("/myAppointment");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed ❌");
    }
  };

  // ================== INIT FETCH ==================
  useEffect(() => {
    fetchDoctors();

    const user = getCurrentUser();
    if (user?.role === "admin") {
      fetchPatients();
      fetchAppointments();
    } else if (user?.role === "patient") {
      fetchAppointments();
    } else if (user?.role === "doctor") {
      getDoctorAppointments();
    }
  }, []);

  // ================== CONTEXT VALUE ==================
  const value = {
    currencySymbol,
    loading,
    setLoading,
    currentUser: getCurrentUser(),
    getPatientId,
    selectAppointmentForPayment,
    handlePayment,
    // doctors
    doctors,
    fetchDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addAppointmentPatient,
    // patients (admin only)
    patients,
    fetchPatients,
    updatePatient,
    deletePatient,

    // appointments
    appointments,
    fetchAppointments,
    //addAppointment,
    deleteAppointment,
    updateAppointmentStatus,

    // image upload
    uploadImage,

    // doctor
    updateDoctorProfile,
    toggleDoctorAvailability,
    getDoctorAppointments,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
