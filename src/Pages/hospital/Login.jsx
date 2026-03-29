import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const HospitalLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { user, login } = useAuth();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/hospital/login", { username, password });
            const { token, user } = res.data;

            login(user, token);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: `Welcome back, ${user.name}`,
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                navigate(`/hospital/${user.hospitalId}/dashboard`);
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.response?.data?.message || "Invalid credentials",
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
                    Hospital Login
                </h2>

                <p className="mt-2 mb-8 text-center text-sm text-gray-400">
                    Secure access for hospital authorities
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        required
                        className="w-full text-white bg-gray-900 p-3 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        required
                        className="w-full text-white bg-gray-900 p-3 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors mt-8"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default HospitalLogin;
