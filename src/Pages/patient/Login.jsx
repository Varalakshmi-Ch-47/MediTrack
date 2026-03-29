import { useState, useEffect } from "react";
import { loginPatient } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [PatientData, setPatientData] = useState({
    patientId: "",
    password: ""
  });


  const handleChange = (e) => {
    setPatientData({
      ...PatientData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await loginPatient(PatientData);
      
      // Ensure the role is set correctly in user object
      const userData = { ...res.data.user, role: "patient" };
      login(userData, res.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${userData.name}`
      }).then(() => {
        navigate(`/patient/${userData.patientId}`, { replace: true });
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Patient Id or Password"
      });

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">

      <form
        onSubmit={handleSubmit}
        className="bg-transparent shadow-md rounded-lg p-8 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold mb-5 text-center text-white">
          Patient Login
        </h2>

        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          autoComplete="username"
          value={PatientData.patientId}
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={PatientData.password}
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded"
        >
          Login
        </button>

        <p className="text-white mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/patient/register")}
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
};

export default Login;