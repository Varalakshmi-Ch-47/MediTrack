import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './models/Appointment.js';

dotenv.config();

const check = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/meditrack";
    await mongoose.connect(mongoUri);
    const appointments = await Appointment.find({});
    console.log("Total Appointments in DB:", appointments.length);
    console.log("Details:", JSON.stringify(appointments, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
