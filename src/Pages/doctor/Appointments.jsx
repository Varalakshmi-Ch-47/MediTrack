import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import API from '../../api/axios';
import Swal from 'sweetalert2';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.name) {
      // Encode doctor's name properly as it might contain spaces
      // Only fetch "active" appointments (hospital approved and patient arrived)
      API.get(`/appointments/doctor/${encodeURIComponent(user.name)}`)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => console.log("Failed to fetch doctor appointments", err));
    }
  }, [user]);

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Appointments</h1>
        <p className="text-gray-500 mt-2">Manage and review your booked consultations</p>
      </header>
      
      <div className="grid gap-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all border-l-4 border-l-pink-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-pink-600">{appointment.patientId}</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{appointment.date}</div>
                  <div className="text-lg text-gray-600">{appointment.time}</div>
                  <div className="text-sm text-gray-500 mt-1">Hospital: {appointment.hospital}</div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={async () => {
                        const result = await Swal.fire({
                            title: 'Complete Consultation?',
                            text: "Mark this appointment as completed.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, Confirm'
                        });
                        if (result.isConfirmed) {
                            await API.patch(`/appointments/status/${appointment._id}`, { status: 'completed' });
                            setAppointments(prev => prev.filter(a => a._id !== appointment._id));
                            Swal.fire('Consultation Completed', '', 'success');
                        }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold shadow-sm"
                  >
                    Confirm Consultation
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;
