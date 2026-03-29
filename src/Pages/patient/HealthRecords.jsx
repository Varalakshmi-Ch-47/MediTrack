import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const HealthRecords = () => {
  const { patientId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.patientId !== patientId) {
      navigate("/login");
      return;
    }

    const fetchRecords = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/records/patient/${patientId}`);
        if (res.ok) {
          const data = await res.json();
          setRecords(data);
        }
      } catch (err) {
        console.error("Failed to fetch records:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [user, patientId, navigate]);

  const getTypeLabel = (type) => {
    switch (type) {
      case "prescription": return "💊 Prescription";
      case "medical_report": return "🩺 Medical Report";
      default: return "📄 Other";
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "prescription": return "bg-green-100 text-green-700";
      case "medical_report": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const filteredRecords = filter === "all"
    ? records
    : records.filter(r => r.recordType === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Health Records</h1>
        <p className="text-gray-500 mt-1">Prescriptions and medical records uploaded by your doctors.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6">
        {[
          { value: "all", label: "All" },
          { value: "prescription", label: "💊 Prescriptions" },
          { value: "medical_report", label: "🩺 Medical Reports" },
          { value: "other", label: "📄 Other" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Records */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <div className="text-6xl mb-4">🗂️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Records Found</h2>
          <p className="text-gray-400 text-sm">
            {filter === "all"
              ? "Your doctor hasn't uploaded any records yet."
              : `No ${filter.replace("_", " ")}s available.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((record) => (
            <div
              key={record._id}
              className="bg-white rounded-2xl shadow hover:shadow-md transition-shadow p-6 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                {record.fileType?.includes("pdf") ? "📄" : "🖼️"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-800 truncate">{record.fileName}</p>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${getTypeBadgeColor(record.recordType)}`}>
                    {record.recordType === "prescription" ? "Prescription" :
                     record.recordType === "medical_report" ? "Report" : "Other"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  👨‍⚕️ Dr. {record.doctorName || "Unknown"} •{" "}
                  {new Date(record.uploadDate).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>

                {record.notes && (
                  <p className="text-sm text-gray-500 mt-1 italic">📝 {record.notes}</p>
                )}

                <div className="flex gap-3 mt-3">
                  <a
                    href={record.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
                  >
                    View
                  </a>
                  <a
                    href={record.fileUrl}
                    download
                    className="text-sm font-medium text-gray-500 hover:text-gray-700 underline"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {!loading && records.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
          Showing {filteredRecords.length} of {records.length} record{records.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
