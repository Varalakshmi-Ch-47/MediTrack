import { useState } from "react";
import { loginDoctor } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const LoginDoctor = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [doctorData, setDoctorData] = useState({
    doctorId: "",
    password: ""
  });

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await loginDoctor(doctorData);

      login(res.data.user, res.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful"
      }).then(() => {
        navigate(`/doctor/${res.data.user.doctorId}`);
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        text: "Invalid Doctor ID or Password"
      });

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">

      <form
        onSubmit={handleSubmit}
        className="bg-transparent shadow-md rounded-lg p-8 w-full max-w-md"
      >

        <h2 className="text-3xl text-white mb-5 text-center">
          Doctor Login
        </h2>

        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          autoComplete="username"
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded"
        >
          Login
        </button>

        {/* REGISTER LINK */}

        <p className="text-white mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/doctor/register")}
          >
            Register here
          </span>
        </p>

      </form>

    </div>
  );
};

export default LoginDoctor;