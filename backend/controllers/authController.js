import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* Generate ID */

const generatePatientId = () => {
  return "PAT-" + Math.floor(100000 + Math.random() * 900000);
};

const generateDoctorId = async () => {
  const lastDoctor = await Doctor.findOne().sort({ doctorId: -1 });
  if (lastDoctor && lastDoctor.doctorId) {
    const lastNum = parseInt(lastDoctor.doctorId.split("-")[1]);
    return "DOC-" + (lastNum + 1).toString().padStart(5, "0");
  }
  return "DOC-00001";
};

/* PATIENT REGISTER */

export const registerPatient = async (req, res) => {
  try {

    const { name, email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const patientId = generatePatientId();

    const patient = await Patient.create({
      patientId,
      name,
      email,
      password: hashedPassword,
      phone
    });

    res.json({
      patientId: patient.patientId
    });

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


/* PATIENT LOGIN */

export const loginPatient = async (req, res) => {
  try {

    const { patientId, password } = req.body;

    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: patient._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { ...patient.toObject(), role: "patient" }
    });

    } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* DOCTOR REGISTER */

export const registerDoctor = async (req, res) => {

  const { name, email, password, specialization, hospital, hospitalId } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const doctorId = await generateDoctorId();

  const doctor = await Doctor.create({
    doctorId,
    name,
    email,
    password: hashedPassword,
    specialization,
    hospital,
    hospitalId
  });

  res.json({
    doctorId: doctor.doctorId
  });
};

/* DOCTOR LOGIN */

export const loginDoctor = async (req, res) => {

  const { doctorId, password } = req.body;

  const doctor = await Doctor.findOne({ doctorId });

  if (!doctor) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, doctor.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: doctor._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: { ...doctor.toObject(), role: "doctor" }
  });
};

/* GET ALL DOCTORS */

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, { password: 0 }); // Exclude password from results
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

/* ADMIN LOGIN (DUMMY) */

export const loginAdmin = async (req, res) => {

  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        name: "Admin",
        role: "admin"
      }
    });
  }

  res.status(401).json({ message: "Invalid admin credentials" });
};

/* HOSPITAL LOGIN */
export const loginHospital = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hospital = await Hospital.findOne({ username });

    if (!hospital) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: hospital._id, role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { ...hospital.toObject(), role: "hospital" }
    });

  } catch (error) {
    console.error("Hospital login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};