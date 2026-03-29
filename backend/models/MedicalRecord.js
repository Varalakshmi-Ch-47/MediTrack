import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
  },
  recordType: {
    type: String,
    enum: ["prescription", "medical_report", "other"],
    default: "prescription",
  },
  notes: {
    type: String,
    default: "",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("MedicalRecord", medicalRecordSchema);
