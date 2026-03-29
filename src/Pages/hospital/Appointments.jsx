import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import Swal from "sweetalert2";

const HospitalAppointments = () => {
    const { hospitalId } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, [hospitalId]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/appointments/hospital/${hospitalId}`);
            setAppointments(res.data);
        } catch (err) {
            console.error("Failed to fetch appointments", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const actionText = status === "approved" ? "approve this appointment" : "mark this patient as ARRIVED";
            const confirmButtonColor = status === "approved" ? "#3085d6" : "#22c55e";

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `You are about to ${actionText}.`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: confirmButtonColor,
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, proceed!'
            });

            if (result.isConfirmed) {
                await API.patch(`/appointments/status/${id}`, { status });
                Swal.fire(
                    'Updated!',
                    `Appointment is now ${status}.`,
                    'success'
                );
                fetchAppointments();
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to update status', 'error');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending": return <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Pending Review</span>;
            case "approved": return <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Approved</span>;
            case "active": return <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">In Consultation</span>;
            case "completed": return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Completed</span>;
            default: return null;
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500 font-medium">Synchronizing records...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Appointment Queue</h2>
                <button 
                    onClick={fetchAppointments}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                </button>
            </div>

            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Schedule</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No appointments found for this hospital.</td>
                            </tr>
                        ) : (
                            appointments.map((app) => (
                                <tr key={app._id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-900">{app.patientName || "Unknown"}</div>
                                        <div className="text-xs text-gray-500">{app.patientId}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-800">{app.doctor}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{app.date}</div>
                                        <div className="text-xs text-gray-600">{app.time}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(app.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {app.status === "pending" && (
                                            <button
                                                onClick={() => handleUpdateStatus(app._id, "approved")}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {app.status === "approved" && (
                                            <button
                                                onClick={() => handleUpdateStatus(app._id, "active")}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                                            >
                                                Mark Arrived
                                            </button>
                                        )}
                                        {app.status === "active" && (
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                                                In Progress
                                            </span>
                                        )}
                                        {app.status === "completed" && (
                                            <span className="text-xs font-medium text-gray-400 italic">
                                                Archived
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HospitalAppointments;
