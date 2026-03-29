import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import API from '../../api/axios';

const UploadRecordModal = ({ patient, doctorId, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [recordType, setRecordType] = useState('prescription');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('patientId', patient.patientId);
      formData.append('doctorId', doctorId);
      formData.append('recordType', recordType);
      formData.append('notes', notes);

      const res = await API.post('/records/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Upload Record</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Uploading for: <span className="font-semibold text-gray-700">{patient.name}</span> ({patient.patientId})
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="prescription">Prescription</option>
              <option value="medical_report">Medical Report</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File (PDF, JPG, PNG)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-3 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add any notes..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Uploading...' : 'Upload Record'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Records = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedRecords, setUploadedRecords] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch ONLY patients linked to this doctor via appointments
  useEffect(() => {
    const fetchPatients = async () => {
      if (!user?.doctorId) return;
      try {
        const res = await API.get(`/records/patients/${user.doctorId}`);
        setPatients(res.data);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      }
    };
    fetchPatients();
  }, [user]);

  // Fetch uploaded records for selected patient
  const fetchRecords = async (patientId) => {
    try {
      const res = await API.get(`/records/patient/${patientId}`);
      setUploadedRecords(res.data);
    } catch (err) {
      console.error('Failed to fetch records:', err);
    }
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('overview');
    fetchRecords(patient.patientId);
  };

  const handleUploadSuccess = () => {
    fetchRecords(selectedPatient.patientId);
    setSuccessMessage('Record uploaded successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const filtered = patients.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.patientId?.toLowerCase().includes(search.toLowerCase())
  );

  const getRecordTypeLabel = (type) => {
    switch (type) {
      case 'prescription': return '💊 Prescription';
      case 'medical_report': return '🩺 Medical Report';
      default: return '📄 Other';
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
          <p className="text-gray-500 mt-1">Upload prescriptions and medical records for your patients.</p>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          ✅ {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-gray-400 text-sm p-4">No patients found.</p>
            ) : (
              filtered.map((patient) => (
                <div
                  key={patient.patientId}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    selectedPatient?.patientId === patient.patientId
                      ? 'bg-blue-50 border-blue-400 shadow-md'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectPatient(patient)}
                >
                  <div className="font-semibold text-gray-800">{patient.name}</div>
                  <div className="text-sm text-gray-500">{patient.patientId}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Patient Details */}
        {selectedPatient ? (
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                  <div className="text-sm text-gray-500 mt-1">{selectedPatient.patientId}</div>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Record
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 border-b mb-6">
                {['overview', 'records'].map(tab => (
                  <button
                    key={tab}
                    className={`pb-2 font-medium px-1 border-b-2 capitalize ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'records' ? 'Uploaded Records' : 'Overview'}
                  </button>
                ))}
              </div>

              {/* Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500">Patient ID</div>
                      <div className="font-semibold text-gray-800 mt-1">{selectedPatient.patientId}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-semibold text-gray-800 mt-1">{selectedPatient.email || '—'}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-semibold text-gray-800 mt-1">{selectedPatient.phone || '—'}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500">Total Records</div>
                      <div className="font-semibold text-blue-600 mt-1">{uploadedRecords.length}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 pt-2">
                    Switch to the "Uploaded Records" tab to see all files uploaded for this patient, or click "Upload Record" to add a new one.
                  </p>
                </div>
              )}

              {/* Uploaded Records */}
              {activeTab === 'records' && (
                <div className="space-y-3">
                  {uploadedRecords.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="text-5xl mb-3">📂</div>
                      <p className="text-gray-500">No records uploaded yet for this patient.</p>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Upload First Record
                      </button>
                    </div>
                  ) : (
                    uploadedRecords.map((record) => (
                      <div key={record._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">
                            {record.fileType?.includes('pdf') ? '📄' : '🖼️'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{record.fileName}</div>
                            <div className="text-xs text-gray-400">
                              {getRecordTypeLabel(record.recordType)} • {new Date(record.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                            {record.notes && <div className="text-sm text-gray-500 mt-1">📝 {record.notes}</div>}
                          </div>
                        </div>
                        <a
                          href={record.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                        >
                          View
                        </a>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">👈</div>
              <p className="text-gray-500 text-lg">Select a patient from the left to view records and upload files.</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedPatient && (
        <UploadRecordModal
          patient={selectedPatient}
          doctorId={user?.doctorId}
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default Records;
