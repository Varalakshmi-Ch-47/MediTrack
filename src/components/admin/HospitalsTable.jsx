import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import DataTable from './DataTable';

const HospitalsTable = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/hospitals')
      .then(res => {
        // Ensure data is mapped correctly to columns
        const formattedData = res.data.map(h => ({
          Name: h.name,
          Location: h.location,
          Contact: h.contact,
          Email: h.email,
        }));
        setHospitals(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching hospitals:", err);
        setLoading(false);
      });
  }, []);

  return (
    <DataTable 
      title="Registered Hospitals" 
      columns={["Name", "Location", "Contact", "Email"]} 
      data={hospitals} 
      loading={loading}
    />
  );
};

export default HospitalsTable;
