import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Hospital from "../models/Hospital.js";

export const getAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorName } = req.params;
    // Only show "active" appointments to doctors (patient has arrived)
    const appointments = await Appointment.find({ 
      doctor: doctorName,
      status: "active" 
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { patientId, patientName, doctor, doctorId, hospital, hospitalId, date, time } = req.body;
    
    if (!patientId || !doctor || !hospital || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new Appointment({
      patientId,
      patientName,
      doctor,
      doctorId,
      hospital,
      hospitalId,
      date,
      time,
      status: "pending" // Default status
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
    console.error("Error booking appointment", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getHospitalAppointments = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const appointments = await Appointment.find({ hospitalId }).sort({ date: 1, time: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching hospital appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "active", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: `Appointment marked as ${status}`, appointment });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
