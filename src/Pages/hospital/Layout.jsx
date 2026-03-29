import React from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const HospitalLayout = () => {
    const { user, logout } = useAuth();
    const { hospitalId } = useParams();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/hospital/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col fixed h-full border-r border-gray-200">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-blue-600">MediTrack</h2>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Hospital Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <NavLink
                        to={`/hospital/${hospitalId}/dashboard`}
                        className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-blue-50 text-gray-700'}`}
                    >
                        <span className="text-xl"></span>
                        <span className="font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink
                        to={`/hospital/${hospitalId}/appointments`}
                        className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-blue-50 text-gray-700'}`}
                    >
                        <span className="text-xl"></span>
                        <span className="font-medium">Appointments</span>
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="mb-4 px-3 py-2 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-tighter">Logged in as</p>
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">{user?.name}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-red-50 text-red-600 transition-all font-medium"
                    >
                        <span></span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Management Console</h1>
                        <p className="text-gray-500 mt-1">{user?.name} — {user?.location}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-blue-600 font-medium">Hospital Authority</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-blue-200 shadow-sm">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[calc(100vh-200px)]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default HospitalLayout;
