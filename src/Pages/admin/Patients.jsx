import React from 'react';
import PatientsTable from '../../components/admin/PatientsTable';

const PatientsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Manage Patients</h2>
      <PatientsTable />
    </div>
  );
};

export default PatientsPage;
