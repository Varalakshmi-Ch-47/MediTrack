import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const RegisteredHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/hospitals')
      .then(res => {
        setHospitals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching hospitals for patients:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="mt-8 text-center text-gray-500">Loading Hospitals...</div>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Explore Registered Hospitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((h) => (
          <div key={h._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl font-bold">
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{h.name}</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center space-x-2">
                <span></span>
                <span>{h.location}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span></span>
                <span>{h.contact}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span></span>
                <span className="truncate">{h.email}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredHospitals;
