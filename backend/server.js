import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/records", medicalRecordRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});