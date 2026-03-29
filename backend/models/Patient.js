import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  password: String,
  phone: String
});

export default mongoose.model("Patient", patientSchema);