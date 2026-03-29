import mongoose from "mongoose";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const predefinedDoctors = [
  { doctorId: "DOC-001", name: "Dr. Ramesh Sharma", email: "ramesh@meditrack.com", password: "doctor123", specialization: "Cardiologist", hospital: "General Hospital", hospitalId: "HOSP-001" },
  { doctorId: "DOC-002", name: "Dr. Anita Nair", email: "anita@meditrack.com", password: "doctor123", specialization: "General Physician", hospital: "City Medical Center", hospitalId: "HOSP-002" },
  { doctorId: "DOC-003", name: "Dr. Sandeep Kumar", email: "kumar@meditrack.com", password: "doctor123", specialization: "Pediatrician", hospital: "Apollo Multispeciality", hospitalId: "HOSP-003" },
  { doctorId: "DOC-004", name: "Dr. Priya Das", email: "priya@meditrack.com", password: "doctor123", specialization: "Orthopedic", hospital: "Unity Orthopedic Center", hospitalId: "HOSP-004" },
  { doctorId: "DOC-005", name: "Dr. Varun Mehta", email: "varun@meditrack.com", password: "doctor123", specialization: "Dermatologist", hospital: "St. Mary's Healthcare", hospitalId: "HOSP-005" },
  { doctorId: "DOC-006", name: "Dr. Sneha Patil", email: "sneha@meditrack.com", password: "doctor123", specialization: "Neurologist", hospital: "Sunrise Heart Institute", hospitalId: "HOSP-006" },
  { doctorId: "DOC-007", name: "Dr. Aman Gupta", email: "aman@meditrack.com", password: "doctor123", specialization: "Surgeon", hospital: "Westside Trauma Center", hospitalId: "HOSP-007" },
  { doctorId: "DOC-008", name: "Dr. Kavita Singh", email: "kavita@meditrack.com", password: "doctor123", specialization: "ENT Specialist", hospital: "Lakeside Children's Hospital", hospitalId: "HOSP-008" }
];

const seedDoctors = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/meditrack";
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected for Seeding Doctors...");

    // Clear existing doctors to ensure "constant" state
    await Doctor.deleteMany();

    for (const doc of predefinedDoctors) {
      const hashedPassword = await bcrypt.hash(doc.password, 10);
      await Doctor.create({ ...doc, password: hashedPassword });
      console.log(`Created: ${doc.name} (${doc.doctorId})`);
    }

    console.log("Doctor Seeding Completed!");
    process.exit();
  } catch (error) {
    console.error("Seeding Failed:", error);
    process.exit(1);
  }
};

seedDoctors();
