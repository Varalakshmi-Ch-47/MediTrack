import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  password: String,
  specialization: String,
  hospital: String,
  hospitalId: String
});

export default mongoose.model("Doctor", doctorSchema);