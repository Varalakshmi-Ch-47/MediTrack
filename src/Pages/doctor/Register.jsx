import { useState } from "react";
import { registerDoctor } from "../../api/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterDoctor = () => {

  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: ""
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

      const res = await registerDoctor(doctorData);

      Swal.fire({
        icon: "success",
        title: "Doctor Registered",
        text: `Doctor ID: ${res.data.doctorId}`
      }).then(() => {

        navigate("/doctor/login");

      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        text: "Registration Failed"
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
          Doctor Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded"
        >
          Register
          
        </button>
        <p className="text-white mt-4 text-center">
  Already registered?{" "}
  <span
    className="underline cursor-pointer"
    onClick={() => navigate("/doctor/login")}
  >
    Login here
  </span>
</p>

      </form>

    </div>

  );
};

export default RegisterDoctor;