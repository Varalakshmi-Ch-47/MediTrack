import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  uploadRecord,
  getPatientRecords,
  getDoctorUploadedRecords,
  getDoctorPatients,
} from "../controllers/medicalRecordController.js";

const router = express.Router();

// Doctor uploads a prescription or medical record for a patient
router.post("/upload", upload.single("file"), uploadRecord);

// Patient fetches their own records
router.get("/patient/:patientId", getPatientRecords);

// Doctor fetches patients they have appointments with
router.get("/patients/:doctorId", getDoctorPatients);

// Doctor fetches records they uploaded
router.get("/doctor/:doctorId", getDoctorUploadedRecords);

export default router;
