import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../api/axios";

const BookAppointmentPopup = ({ user, onClose, onBooked }) => {
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);

  // Fetch registered doctors
  useEffect(() => {
    API.get("/auth/doctors")
      .then((res) => {
        setDoctorsList(res.data);
        if (res.data.length === 0) console.warn("No doctors found. Run: node scripts/seedDoctors.js");
      })
      .catch((err) => console.log("Failed to fetch doctors:", err));
  }, []);

  const handleSubmit = async () => {
    if (!hospital || !doctor || !date || !time) {
      alert("Please fill all details before booking.");
      return;
    }

    try {
      // Find the doctor object to get the correct hospitalId
      const selectedDoc = doctorsList.find(d => d.name === doctor);
      
      await API.post("/appointments/book", {
        patientId: user.patientId,
        patientName: user.name,
        doctor: doctor,
        doctorId: selectedDoc?.doctorId,
        hospital: hospital,
        hospitalId: selectedDoc?.hospitalId, // Use the real ID from the doctor record
        date,
        time,
      });


      Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: `Your appointment with ${doctor} is confirmed.`,
        confirmButtonText: "OK",
      }).then(() => {
        onBooked(); 
        onClose();  
      });

    } catch (err) {
      console.log("BOOK ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>

        <input
          type="text"
          value={user.name}
          disabled
          className="w-full border p-2 rounded mb-2 bg-gray-200"
        />

        <input
          type="text"
          value={user.phone}
          disabled
          className="w-full border p-2 rounded mb-2 bg-gray-200"
        />

        <select
          className="w-full border p-2 rounded mb-2"
          value={doctor}
          onChange={(e) => {
            const docName = e.target.value;
            setDoctor(docName);
            const docData = doctorsList.find(d => d.name === docName);
            if (docData && docData.hospital) {
              setHospital(docData.hospital);
            } else {
              setHospital(""); // Clear hospital if no doctor or hospital data
            }
          }}
        >
          <option value="" disabled>
            {doctorsList.length === 0 ? "No doctors available" : "Select Doctor"}
          </option>
          {doctorsList.map((d) => (
            <option key={d._id} value={d.name}>
              {d.name} {d.specialization ? `(${d.specialization})` : ""}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={hospital}
          disabled
          placeholder="Hospital Name"
          className="w-full border p-2 rounded mb-2 bg-gray-100"
        />

        <input
          type="date"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Book
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookAppointmentPopup;
