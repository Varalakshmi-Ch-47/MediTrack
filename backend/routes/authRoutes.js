import express from "express";
import {
  registerPatient,
  loginPatient,
  registerDoctor,
  loginDoctor,
  getDoctors,
  loginAdmin,
  loginHospital
} from "../controllers/authController.js";

const router = express.Router();

router.post("/patient/register", registerPatient);
router.post("/patient/login", loginPatient);

router.post("/doctor/register", registerDoctor);
router.post("/doctor/login", loginDoctor);
router.get("/doctors", getDoctors);

router.post("/admin/login", loginAdmin);
router.post("/hospital/login", loginHospital);

export default router;