import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hospital from '../models/Hospital.js';

import bcrypt from 'bcryptjs';

dotenv.config();

const hospitals = [
  {
    hospitalId: "HOSP-001",
    name: "General Hospital",
    username: "admin_general",
    password: "hospital123",
    location: "Downtown, Metro City",
    contact: "123-456-7890",
    email: "info@generalhospital.com"
  },
  {
    hospitalId: "HOSP-002",
    name: "City Medical Center",
    username: "admin_city",
    password: "hospital123",
    location: "Uptown, North District",
    contact: "987-654-3210",
    email: "contact@citymed.com"
  },
  {
    hospitalId: "HOSP-003",
    name: "Apollo Multispeciality",
    username: "admin_apollo",
    password: "hospital123",
    location: "Central City, South Wing",
    contact: "456-789-0123",
    email: "admin@apollo.com"
  }
];

const connectAndSeed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/meditrack";
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected for seeding");
    
    // Hash passwords before inserting
    const hashedHospitals = await Promise.all(hospitals.map(async (h) => ({
      ...h,
      password: await bcrypt.hash(h.password, 10)
    })));

    await Hospital.deleteMany();
    await Hospital.insertMany(hashedHospitals);
    console.log("Hospitals Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

connectAndSeed();
