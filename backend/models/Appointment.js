import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: String,
  patientName: String,
  doctorId: String,
  doctor: String,
  hospital: String,
  hospitalId: String,
  date: String,
  time: String,
  status: {
    type: String,
    enum: ["pending", "approved", "active", "completed"],
    default: "pending"
  }
});

export default mongoose.model("Appointment", appointmentSchema);
