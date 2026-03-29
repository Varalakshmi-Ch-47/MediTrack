import MedicalRecord from "../models/MedicalRecord.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

/* UPLOAD MEDICAL RECORD (Doctor only - restricted to appointment patients) */
export const uploadRecord = async (req, res) => {
  try {
    const { patientId, doctorId, recordType, notes } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate doctor exists
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Validate that the doctor has an ACTIVE appointment with this patient
    const appointment = await Appointment.findOne({ 
      patientId, 
      doctor: doctor.name,
      status: "active"
    });

    if (!appointment) {
      return res.status(403).json({ 
        message: "Access Denied: You can only upload records for patients with an ACTIVE consultation." 
      });
    }

    const record = await MedicalRecord.create({
      patientId,
      doctorId,
      doctorName: doctor.name,
      fileName: req.file.originalname || req.file.filename,
      fileUrl: req.file.path,
      fileType: req.file.mimetype,
      recordType: recordType || "prescription",
      notes: notes || "",
    });

    res.status(201).json({ message: "Record uploaded successfully", record });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload record" });
  }
};

/* GET RECORDS FOR A PATIENT (Scoped to patientId) */
export const getPatientRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    // Ownership is largely handled by frontend auth, but backend ensures we only return records for THIS patientId
    const records = await MedicalRecord.find({ patientId }).sort({ uploadDate: -1 });
    res.json(records);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch records" });
  }
};

/* GET PATIENTS LINKED TO A DOCTOR VIA APPOINTMENTS */
export const getDoctorPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find all unique patient IDs from ACTIVE appointments with this doctor
    const patientIds = await Appointment.distinct("patientId", { 
      doctor: doctor.name,
      status: "active"
    });
    
    // Fetch patient details for these IDs
    const patients = await Patient.find({ patientId: { $in: patientIds } }, { password: 0 });
    
    res.json(patients);
  } catch (error) {
    console.error("Fetch doctor patients error:", error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};

/* GET RECORDS UPLOADED BY A DOCTOR */
export const getDoctorUploadedRecords = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const records = await MedicalRecord.find({ doctorId }).sort({ uploadDate: -1 });
    res.json(records);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch records" });
  }
};
