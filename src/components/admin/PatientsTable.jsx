import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import DataTable from './DataTable';

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/patients')
      .then(res => {
        const formattedData = res.data.map(p => ({
          ID: p.patientId,
          Name: p.name,
          Email: p.email,
          Phone: p.phone,
        }));
        setPatients(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching patients:", err);
        setLoading(false);
      });
  }, []);

  return (
    <DataTable 
      title="Registered Patients" 
      columns={["Patient ID", "Name", "Email", "Phone"]} 
      data={patients} 
      loading={loading}
    />
  );
};

export default PatientsTable;
