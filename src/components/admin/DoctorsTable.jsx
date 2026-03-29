import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import DataTable from './DataTable';

const DoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/doctors')
      .then(res => {
        const formattedData = res.data.map(d => ({
          ID: d.doctorId,
          Name: d.name,
          Email: d.email,
          Specialization: d.specialization,
          Hospital: d.hospital,
        }));
        setDoctors(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

  return (
    <DataTable 
      title="Registered Doctors" 
      columns={["Doctor ID", "Name", "Email", "Specialization", "Hospital"]} 
      data={doctors} 
      loading={loading}
    />
  );
};

export default DoctorsTable;
