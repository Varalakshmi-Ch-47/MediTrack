import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 ${color}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </div>
);

const Overview = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    hospitals: 0,
    appointments: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, d, h, a] = await Promise.all([
          API.get('/admin/patients'),
          API.get('/admin/doctors'),
          API.get('/admin/hospitals'),
          API.get('/admin/appointments')
        ]);
        setStats({
          patients: p.data.length,
          doctors: d.data.length,
          hospitals: h.data.length,
          appointments: a.data.length
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={stats.patients} icon="" color="border-l-blue-500" />
        <StatCard title="Total Doctors" value={stats.doctors} icon="" color="border-l-pink-500" />
        <StatCard title="Total Hospitals" value={stats.hospitals} icon="" color="border-l-green-500" />
        <StatCard title="Upcoming Appointments" value={stats.appointments} icon="" color="border-l-purple-500" />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">System Activity Overview</h3>
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">Activity Chart Visualization</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
