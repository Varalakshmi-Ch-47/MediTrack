import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import API from '../../api/axios';

const Charts = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Analytics Charts</h3>
    {/* <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} /> */}
    <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
      Doughnut Chart Placeholder (Charts.jsx)
    </div>
  </div>
);

// Cards placeholder (for Cards.jsx)
const Cards = ({ appointments }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCount = appointments.filter(a => a.date === today).length;
  const totalCount = appointments.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-pink-500">
        <h3 className="font-semibold mb-2 text-gray-700">Today's Appointments</h3>
        <p className="text-3xl font-bold text-pink-600">{todayCount}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
        <h3 className="font-semibold mb-2 text-gray-700">Total Appointments</h3>
        <p className="text-3xl font-bold text-purple-600">{totalCount}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
        <h3 className="font-semibold mb-2 text-gray-700">Pending Actions</h3>
        <p className="text-3xl font-bold text-blue-600">0</p>
      </div>
    </div>
  );
};

// Main Dashboard (combines Layout.jsx)
const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.name) {
      API.get(`/appointments/doctor/${encodeURIComponent(user.name)}`)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => console.log("Failed to fetch doctor appointments", err));
    }
  }, [user]);

  if (!user || user.role !== 'doctor') {
    return <div className="p-10 text-center">Loading Doctor Profile...</div>;
  }

  // Get initial logic
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center px-6 border-b">
        <div className="flex-1 font-bold text-xl text-pink-600">MediTrack Doctor <span className="text-xs font-normal text-gray-400 ml-2">({user.doctorId})</span></div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 p-2 bg-pink-50 rounded-lg">
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name ? user.name.charAt(0) : 'D'}
            </div>
            <div>
              <div className="font-semibold text-sm">{user.name}</div>
              <div className="text-xs text-pink-600">{user.specialization || 'Doctor'}</div>
            </div>
          </div>
          <button
            onClick={() => { logout(); window.location.href = '/doctor/login'; }}
            className="text-red-500 hover:bg-red-50 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 bg-white shadow-sm z-40 py-6 px-4 border-r">
        <nav className="space-y-2">
          <a href={`/doctor/${user.doctorId}`} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition-all">
            <span></span><span>Dashboard</span>
          </a>
          <a href={`/doctor/${user.doctorId}/appointments`} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition-all">
            <span></span><span>Appointments</span>
          </a>
          <a href={`/doctor/${user.doctorId}/records`} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition-all">
            <span></span><span>Patient Records</span>
          </a>
        </nav>
      </aside>

      <main className="ml-56 mt-16 p-8">
        <Cards appointments={appointments} />
        <Charts />
      </main>
    </div>
  );
};
export default DoctorDashboard;
