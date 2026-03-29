
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-4xl font-bold mb-12">
        MediTrack Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Patient */}
        <div
          onClick={() => navigate("/patient/login")}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-10 rounded-xl shadow-lg text-center text-xl font-semibold transition"
        >
          Patient
        </div>

        {/* Doctor */}
        <div
          onClick={() => navigate("/doctor/login")}
          className="cursor-pointer bg-green-500 hover:bg-green-600 text-white p-10 rounded-xl shadow-lg text-center text-xl font-semibold transition"
        >
          Doctor
        </div>

        {/* Hospital */}
        <div
          onClick={() => navigate("/hospital/login")}
          className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white p-10 rounded-xl shadow-lg text-center text-xl font-semibold transition"
        >
          Hospital
        </div>

        {/* Admin */}
        <div
          onClick={() => navigate("/admin")}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-10 rounded-xl shadow-lg text-center text-xl font-semibold transition"
        >
          Admin
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
