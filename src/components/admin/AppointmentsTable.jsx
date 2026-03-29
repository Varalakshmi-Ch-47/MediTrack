import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import DataTable from './DataTable';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/appointments')
      .then(res => {
        const formattedData = res.data.map(a => ({
          PatientID: a.patientId,
          Doctor: a.doctor,
          Hospital: a.hospital,
          Date: a.date,
          Time: a.time,
        }));
        setAppointments(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  return (
    <DataTable 
      title="Upcoming Appointments" 
      columns={["Patient ID", "Doctor", "Hospital", "Date", "Time"]} 
      data={appointments} 
      loading={loading}
    />
  );
};

export default AppointmentsTable;
