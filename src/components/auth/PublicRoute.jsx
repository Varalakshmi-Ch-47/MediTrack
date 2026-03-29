import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        // Redirection logic based on role
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'hospital' && user.hospitalId) return <Navigate to={`/hospital/${user.hospitalId}/dashboard`} replace />;
        if (user.role === 'doctor' && user.doctorId) return <Navigate to={`/doctor/${user.doctorId}`} replace />;
        if (user.role === 'patient' && user.patientId) return <Navigate to={`/patient/${user.patientId}`} replace />;

        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
