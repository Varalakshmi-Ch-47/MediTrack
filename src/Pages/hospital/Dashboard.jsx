import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

const HospitalDashboard = () => {
    const { hospitalId } = useParams();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        active: 0,
        completed: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get(`/appointments/hospital/${hospitalId}`);
                const apps = res.data;
                setStats({
                    total: apps.length,
                    pending: apps.filter(a => a.status === "pending").length,
                    approved: apps.filter(a => a.status === "approved").length,
                    active: apps.filter(a => a.status === "active").length,
                    completed: apps.filter(a => a.status === "completed").length
                });
            } catch (err) {
                console.error("Failed to fetch hospital stats", err);
            }
        };
        fetchStats();
    }, [hospitalId]);

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Operational Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl text-white shadow-lg">
                    <div className="text-sm font-medium opacity-80 mb-2">Total Appointments</div>
                    <div className="text-4xl font-bold">{stats.total}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-2">Pending Review</div>
                    <div className="text-4xl font-bold text-orange-500">{stats.pending}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-2">Active Consultations</div>
                    <div className="text-4xl font-bold text-green-500">{stats.active}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-2">Completed Today</div>
                    <div className="text-4xl font-bold text-blue-600">{stats.completed}</div>
                </div>
            </div>

            <div className="mt-10 p-8 bg-blue-50 rounded-3xl border border-blue-100 italic text-blue-800">
                "Efficiency in approval leads to excellence in care. Ensure timely activation as patients arrive."
            </div>
        </div>
    );
};

export default HospitalDashboard;
