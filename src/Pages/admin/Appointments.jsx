import React from 'react';
import AppointmentsTable from '../../components/admin/AppointmentsTable';

const AppointmentsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Upcoming Appointments</h2>
      <AppointmentsTable />
    </div>
  );
};

export default AppointmentsPage;
