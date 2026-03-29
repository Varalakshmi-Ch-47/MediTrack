import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospitalId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: String,
  contact: String,
  email: String
});

export default mongoose.model("Hospital", hospitalSchema);
