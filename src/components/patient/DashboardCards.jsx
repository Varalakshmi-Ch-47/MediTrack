import { useNavigate } from "react-router-dom";
const DashboardCards = ({ allAppointments = [] }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const lastConsultation = allAppointments.length > 0
    ? allAppointments.reduce((latest, appt) =>
        new Date(appt.date) > new Date(latest.date) ? appt : latest
      ).date
    : "None";

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        className=" bg-pink-100 border border-pink-100 rounded-xl p-5 hover:shaodw-md cursor-pointer transition"
        onClick={() => navigate(`/patient/${user.patientId}/calendar`)}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="flex items-center  gap-2 font-semibold text-gray-800">
            Consultations
          </span>
          <span className="text-gray-500">{">"}</span>
        </div>
        <p className="text-gray-500 text-sm">Last Consultation: {lastConsultation}</p>
        <p className="text-gray-800 font-semibold mt-1">
          {allAppointments.length < 10 ? `0${allAppointments.length}` : allAppointments.length} All time consultations
        </p>
            </div>
         <div className=" bg-purple-100 border border-purple-100 rounded-xl p-5 hover:shaodw-md cursor-pointer transition">
                <div className="flex justify-between items-center mb-3">
          <span className="flex items-center  gap-2 font-semibold text-gray-800">
            Prescriptions
          </span>
          <span className="text-gray-500">{">"}</span>
        </div>
        <p className="text-gray-500 text-sm">Last added 12.02.2026</p>
        <p className="text-gray-800 font-semibold mt-1">01 available prescription</p>
            </div>
         <div className=" bg-red-50 border border-red-100 rounded-xl p-5 hover:shaodw-md cursor-pointer transition">
                <div className="flex justify-between items-center mb-3">
          <span className="flex items-center  gap-2 font-semibold text-gray-800">
            Lab Screenings
          </span>
          <span className="text-gray-500">{">"}</span>
        </div>
        <p className="text-gray-500 text-sm">04 Lab Tests</p>
        <p className="text-gray-800 font-semibold mt-1">Cancer Screening Test</p>
            </div>
        </div>
    );
};
export default DashboardCards;
