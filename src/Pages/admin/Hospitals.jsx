import React from 'react';
import HospitalsTable from '../../components/admin/HospitalsTable';

const HospitalsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Manage Hospitals</h2>
      <HospitalsTable />
    </div>
  );
};

export default HospitalsPage;
