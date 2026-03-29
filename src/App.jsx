

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import Dashboard from "./Pages/Dashboard";

import PatientLogin from "./Pages/patient/Login";
import PatientRegister from "./Pages/patient/Register";
import PatientHome from "./Pages/patient/PatientHome";
import CalendarAppointments from "./components/patient/CalenderAppointments";
import HealthRecords from "./Pages/patient/HealthRecords";

import DoctorLogin from "./Pages/doctor/Login";
import DoctorRegister from "./Pages/doctor/Register";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorAppointments from "./Pages/doctor/Appointments";
import DoctorRecords from "./Pages/doctor/Records";

import Admin from "./Pages/Admin";
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminOverview from "./Pages/admin/Overview";
import AdminPatients from "./Pages/admin/Patients";
import AdminDoctors from "./Pages/admin/Doctors";
import AdminHospitals from "./Pages/admin/Hospitals";
import AdminAppointments from "./Pages/admin/Appointments";

import HospitalLogin from "./Pages/hospital/Login";
import HospitalLayout from "./Pages/hospital/Layout";
import HospitalDashboard from "./Pages/hospital/Dashboard";
import HospitalAppointments from "./Pages/hospital/Appointments";

function App() {
  return (
    <Router>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Patient */}
        <Route path="/patient/login" element={<PublicRoute><PatientLogin /></PublicRoute>} />
        <Route path="/patient/register" element={<PublicRoute><PatientRegister /></PublicRoute>} />
        <Route path="/patient/:patientId" element={<ProtectedRoute role="patient"><PatientHome /></ProtectedRoute>} />
        <Route path="/patient/:patientId/calendar" element={<ProtectedRoute role="patient"><CalendarAppointments /></ProtectedRoute>} />
        <Route path="/patient/:patientId/records" element={<ProtectedRoute role="patient"><HealthRecords /></ProtectedRoute>} />

        {/* Doctor */}
        <Route path="/doctor/login" element={<PublicRoute><DoctorLogin /></PublicRoute>} />
        <Route path="/doctor/register" element={<PublicRoute><DoctorRegister /></PublicRoute>} />
        <Route path="/doctor/:doctorId" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/doctor/:doctorId/appointments" element={<ProtectedRoute role="doctor"><DoctorAppointments /></ProtectedRoute>} />
        <Route path="/doctor/:doctorId/records" element={<ProtectedRoute role="doctor"><DoctorRecords /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<PublicRoute><Admin /></PublicRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="hospitals" element={<AdminHospitals />} />
          <Route path="appointments" element={<AdminAppointments />} />
        </Route>

        {/* Hospital */}
        <Route path="/hospital/login" element={<PublicRoute><HospitalLogin /></PublicRoute>} />
        <Route path="/hospital/:hospitalId" element={<ProtectedRoute role="hospital"><HospitalLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<HospitalDashboard />} />
          <Route path="appointments" element={<HospitalAppointments />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

