import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ['Completed', 'Pending', 'Free'],
    datasets: [{
      data: [5, 3, 2],
      backgroundColor: ['#16a34a', '#f59e0b', '#2563eb'],
      borderWidth: 0,
      hoverOffset: 12
    }]
  };
  const options = {
    cutout: '65%',
    plugins: { legend: { position: 'bottom' } },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="p-8 space-y-8">
      {/* Summary */}
      <div className="flex items-center space-x-6 text-sm text-gray-500">
        <span>Clinical activity summary • Updated in real-time</span>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <div className="text-3xl font-bold text-blue-600">8</div>
          <div className="text-sm font-medium text-gray-600 mt-2">Appointments</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <div className="text-3xl font-bold text-green-600">3</div>
          <div className="text-sm font-medium text-gray-600 mt-2">Completed</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <div className="text-3xl font-bold text-orange-600">124</div>
          <div className="text-sm font-medium text-gray-600 mt-2">Avg Consultation</div>
        </div>
      </div>

      {/* Recent Appointment */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold">Next Appointment</span>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold">11:30 AM</div>
          <div className="text-lg">Ramesh Kumar</div>
          <div>Hypertension Follow-up</div>
        </div>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Appointments</h2>
          <div className="h-96">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
