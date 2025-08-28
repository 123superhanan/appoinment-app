// backend/data/mockData.js

// --- USERS ---
export const users = [
  { name: "John Doe", email: "john@example.com", password: "123456" },
  { name: "Sarah Khan", email: "sarah@example.com", password: "123456" },
  { name: "Michael Smith", email: "michael@example.com", password: "123456" }, // ✅ added
];

// --- ADMINS ---
export const admins = [
  {
    name: "Super Admin",
    email: "superadmin@example.com",
    password: "SuperAdmin123!",
    role: "superadmin",
  },
  {
    name: "Clinic Admin",
    email: "admin@example.com",
    password: "Admin123!",
    role: "admin",
  },
];

// --- DOCTORS ---
export const doctors = [
  {
    name: "Dr. Richard James",
    email: "richard.james@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Richard James provides comprehensive primary care with a focus on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Emily Larson",
    email: "emily.larson@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson specializes in women’s health and gynecological care, offering both preventive and treatment services.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Sarah Patel",
    email: "sarah.patel@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Sarah Patel provides dermatological care focusing on skin conditions, treatment, and prevention.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Christopher Lee",
    email: "christopher.lee@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Pediatrician",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Christopher Lee is committed to children’s health, offering compassionate pediatric care.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Jennifer Garcia",
    email: "jennifer.garcia@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia provides expert care in neurology, focusing on nervous system disorders and treatments.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Andrew Williams",
    email: "andrew.williams@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams specializes in neurology, ensuring patients receive advanced treatment and diagnosis.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Jeffrey King",
    email: "jeffrey.king@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Pediatrician",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King is a pediatrician passionate about child development and healthcare.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Zoe Kelly",
    email: "zoe.kelly@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly is dedicated to diagnosing and treating neurological disorders with a patient-centered approach.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Chloe Evans",
    email: "chloe.evans@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans focuses on preventive medicine and patient wellness through comprehensive care.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Amelia Hill",
    email: "amelia.hill@example.com",
    password: "123456",
    image: "https://via.placeholder.com/150",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Amelia Hill provides dermatology consultations with a focus on prevention and long-term skin health.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];

// --- APPOINTMENTS ---
export const appointments = [
  {
    patient: "John Doe",
    doctor: "Dr. Richard James",
    date: "2025-08-22",
    time: "10:30 AM",
    status: "pending",
  },
  {
    patient: "Sarah Khan",
    doctor: "Dr. Emily Larson",
    date: "2025-08-22",
    time: "12:00 PM",
    status: "pending",
  },
  {
    patient: "Michael Smith",
    doctor: "Dr. Richard James",
    date: "2025-08-23",
    time: "09:00 AM",
    status: "accepted",
  },
];
