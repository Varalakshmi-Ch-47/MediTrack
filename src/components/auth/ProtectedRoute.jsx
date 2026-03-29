import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to the specific login page based on the role requested
        if (role === 'admin') return <Navigate to="/admin" replace />;
        if (role === 'hospital') return <Navigate to="/hospital/login" replace />;
        if (role === 'doctor') return <Navigate to="/doctor/login" replace />;
        if (role === 'patient') return <Navigate to="/patient/login" replace />;
        
        return <Navigate to="/" replace />;
    }

    if (role && user.role !== role) {
        // If the user's role doesn't match the required role, redirect to unauthorized or home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
