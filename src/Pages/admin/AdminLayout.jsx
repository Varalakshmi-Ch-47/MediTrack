import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Protection check
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col fixed h-full">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">MediTrack</h2>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
          >
            <span></span><span>Overview</span>
          </NavLink>
          <NavLink 
            to="/admin/patients" 
            className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
          >
            <span></span><span>Patients</span>
          </NavLink>
          <NavLink 
            to="/admin/doctors" 
            className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
          >
            <span></span><span>Doctors</span>
          </NavLink>
          <NavLink 
            to="/admin/hospitals" 
            className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
          >
            <span></span><span>Hospitals</span>
          </NavLink>
          <NavLink 
            to="/admin/appointments" 
            className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
          >
            <span></span><span>Appointments</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-red-50 text-red-600 transition-all"
          >
            <span></span><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
            <div>
              <div className="font-semibold text-sm">Administrator</div>
              <div className="text-xs text-blue-600">Central Authority</div>
            </div>
          </div>
        </header>
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
