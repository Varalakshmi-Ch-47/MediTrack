
import { useNavigate } from "react-router-dom";

const PatientProfileCard = ({ user }) => {

  const navigate = useNavigate();

  // Prevent crash if user is not loaded yet
  if (!user) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">

      <div className="flex flex-col items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Patient"
          className="w-24 h-24 rounded-full object-cover mb-3"
        />

        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500 text-sm">Patient</p>
      </div>

      <div className="flex justify-between text-center mt-6">
        <div>
          <p className="text-gray-400 text-sm">Blood</p>
          <p className="text-pink-600 font-semibold">O-</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Weight</p>
          <p className="text-pink-600 font-semibold">60kg</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Height</p>
          <p className="text-pink-600 font-semibold">160cm</p>
        </div>
      </div>

      <hr className="my-5" />

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Health Plans</h3>
          <span className="text-gray-400">{">"}</span>
        </div>

        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Drink 8 litre water daily</li>
        </ul>
      </div>

      <div className="space-y-3">

        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => navigate(`/patient/${user.patientId}/records`)}
        >
          <span className="font-medium">My Health Records</span>
          <span className="text-gray-400">{">"}</span>
        </div>

        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => navigate(`/patient/${user.patientId}/calendar`)}
        >
          <span className="font-medium">Appointments</span>
          <span className="text-gray-400">{">"}</span>
        </div>

      </div>

      <div className="bg-pink-100 rounded-xl p-4 mt-5">
        <h4 className="font-semibold text-sm mb-1">Explore Pharmacy</h4>
        <p className="text-xs text-gray-600">
          Get your prescribed medicines delivered at your doorstep
        </p>
      </div>

    </div>
  );
};

export default PatientProfileCard;

