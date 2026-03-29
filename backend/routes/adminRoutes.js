import express from "express";
import { 
  getAllPatients, 
  getAllDoctors, 
  getAllHospitals, 
  getAllAppointments,
  addHospital
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/patients", getAllPatients);
router.get("/doctors", getAllDoctors);
router.get("/hospitals", getAllHospitals);
router.get("/appointments", getAllAppointments);
router.post("/hospitals", addHospital);

export default router;
