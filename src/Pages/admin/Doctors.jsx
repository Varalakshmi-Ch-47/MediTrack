import React from 'react';
import DoctorsTable from '../../components/admin/DoctorsTable';

const DoctorsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Manage Doctors</h2>
      <DoctorsTable />
    </div>
  );
};

export default DoctorsPage;
