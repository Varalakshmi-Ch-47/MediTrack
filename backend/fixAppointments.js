import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './models/Appointment.js';
import Doctor from './models/Doctor.js';

dotenv.config();

const fix = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/meditrack";
    await mongoose.connect(mongoUri);
    
    const appointments = await Appointment.find({});
    console.log(`Found ${appointments.length} appointments to check...`);

    for (const app of appointments) {
        // Find the doctor for this appointment to get their hospitalId
        const doc = await Doctor.findOne({ name: app.doctor });
        if (doc && doc.hospitalId) {
            app.hospitalId = doc.hospitalId;
            app.doctorId = doc.doctorId;
            await app.save();
            console.log(`Fixed appointment for ${app.patientName} with ${app.doctor} -> Hospital ID: ${doc.hospitalId}`);
        } else {
            console.log(`Could not find doctor/hospitalId for ${app.doctor}`);
        }
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fix();
