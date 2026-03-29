
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

import PatientProfileCard from "../../components/patient/PatientProfileCard";
import DashboardCards from "../../components/patient/DashboardCards";
import UpcomingAppointments from "../../components/patient/UpcomingAppointments";
import BookAppointmentPopup from "../../components/patient/BookAppointmentPopup";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import API from "../../api/axios";


const PatientHome = () => {
  const { user, logout } = useAuth();
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [allAppointments, setAllAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [reloadAppointments, setReloadAppointments] = useState(false);

  // Protect route
  useEffect(() => {
    if (!user || user.role !== "patient") {
      navigate("/patient/login", { replace: true });
      return;
    }

    if (user.patientId !== patientId) {
      navigate(`/patient/${user.patientId}`, { replace: true });
    }
  }, [user, patientId, navigate]);

  // Fetch today's appointments
  useEffect(() => {
    if (!user?.patientId) return;

    const today = new Date().toISOString().split("T")[0];

    API.get(`/appointments/${user.patientId}`)
      .then((res) => {
        setAllAppointments(res.data);
        const todays = res.data.filter((appt) => appt.date === today);
        setTodayAppointments(todays);
      })
      .catch((err) => console.log("TODAY ERROR:", err));
  }, [user?.patientId, reloadAppointments]);

  return (
    <div className="min-h-screen bg-gray-100 flex p-6 gap-10">

      {/* LEFT SECTION */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-1">
          Welcome {user?.name},
        </h1>

        <p className="text-gray-600 mb-6">
          {todayAppointments.length === 0
            ? "You have no appointments today"
            : `You have ${todayAppointments.length} appointment(s) today`}
        </p>

        <DashboardCards allAppointments={allAppointments} />

        <div className="mt-8">
          <UpcomingAppointments allAppointments={allAppointments} />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col items-end pr-6 mt-4">

        {/* Schedule + Logout */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setShowBooking(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition"
          >
            Schedule Appointment
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/patient/login", { replace: true });
            }}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>

        </div>

        {/* Profile Card */}
        <div className="mt-6">
          <PatientProfileCard user={user} />
        </div>

      </div>

      {/* Appointment Popup */}
      {showBooking && (
        <BookAppointmentPopup
          user={user}
          onClose={() => setShowBooking(false)}
          onBooked={() => setReloadAppointments((prev) => !prev)}
        />
      )}

    </div>
  );
};

export default PatientHome;
