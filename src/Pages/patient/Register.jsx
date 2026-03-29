import { useState } from "react";
import { registerpatient } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {

  const navigate = useNavigate();

  const [PatientData, setPatientData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
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

      const res = await registerpatient(PatientData);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Your Patient ID: ${res.data.patientId}`
      }).then(() => {

        navigate("/patient/login");

      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        text: "Something went wrong"
      });

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-black">

      <form
        onSubmit={handleSubmit}
        className="bg-transparent shadow-md rounded-lg p-8 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold mb-5 text-white text-center">
          Patient Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
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
          name="phone"
          placeholder="Phone"
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
            onClick={() => navigate("/patient/login")}
          >
            Login
          </span>
        </p>

      </form>

    </div>

  );
};

export default Register;