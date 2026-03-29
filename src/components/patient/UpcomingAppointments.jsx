import useAuth from "../../hooks/useAuth";

const UpcomingAppointments = ({ allAppointments = [] }) => {
  const { user } = useAuth();

  const todayStr = new Date().toISOString().split("T")[0];
  
  // Filter for today or future dates
  const upcoming = allAppointments
    .filter((appt) => appt.date >= todayStr)
    .sort((a, b) => {
      if (a.date === b.date) return a.time.localeCompare(b.time);
      return a.date.localeCompare(b.date);
    });

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Upcoming Consultations</h2>

      {upcoming.length === 0 && (
        <p className="text-gray-600">No upcoming appointments</p>
      )}

      {upcoming.map((appt, index) => (
        <div key={index} className="border-b py-4 flex justify-between items-center last:border-0">
          <div>
            <p className="font-bold text-gray-800 underline underline-offset-4 decoration-blue-200">{appt.doctor}</p>
            <p className="text-sm text-gray-600 mt-1">{appt.hospital}</p>
            <p className="text-xs text-gray-400 mt-1">{appt.date} • {appt.time}</p>
          </div>
          <div className="text-right">
             {appt.status === "pending" && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold uppercase tracking-tight">Pending Approval</span>}
             {appt.status === "approved" && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-bold uppercase tracking-tight">Approved</span>}
             {appt.status === "active" && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded font-bold uppercase tracking-tight">Active Consultation</span>}
             {appt.status === "completed" && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold uppercase tracking-tight">Completed</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingAppointments;
