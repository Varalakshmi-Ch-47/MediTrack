import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [adminData, setAdminData] = useState({
    username: "",
    password: ""
  });


  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/admin/login", adminData);
      login(res.data.user, res.data.token);
      
      Swal.fire({
        icon: "success",
        title: "Admin Access Granted",
        text: "Welcome back, Administrator",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate("/admin/dashboard");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Admin Credentials"
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-transparent shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-5 text-center text-white">
          Admin Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={adminData.username}
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={adminData.password}
          onChange={handleChange}
          className="w-full text-white bg-gray-900 p-3 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors"
        >
          Login
        </button>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>&copy; 2026 MediTrack Admin Systems</p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;