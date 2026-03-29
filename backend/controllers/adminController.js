import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import Hospital from "../models/Hospital.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}, { password: 0 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, { password: 0 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospitals" });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

export const addHospital = async (req, res) => {
  try {
    const { name, location, contact, email } = req.body;
    const hospital = await Hospital.create({ name, location, contact, email });
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Failed to add hospital" });
  }
};
