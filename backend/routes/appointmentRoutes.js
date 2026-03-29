import express from "express";
import { 
  bookAppointment, 
  getAppointments, 
  getDoctorAppointments,
  getHospitalAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/:patientId", getAppointments);
router.get("/doctor/:doctorName", getDoctorAppointments);
router.get("/hospital/:hospitalId", getHospitalAppointments);
router.patch("/status/:id", updateAppointmentStatus);

export default router;
