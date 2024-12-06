import React, { useState } from "react";
import useUserStore from "../../stores/user-store"; // Import Zustand store
import { toast } from "react-toastify";

function Login({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useUserStore((state) => state.login); // ดึงฟังก์ชัน login

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password }); // ส่งข้อมูลไปยังฟังก์ชัน login
            alert("Login successful!");
            onClose(); // ปิด modal
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            console.error("Login error:", error.response?.data || error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg w-96 p-6 relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white text-2xl hover:text-gray-200"
                >
                    &times;
                </button>
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Log In</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-black w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-white">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-black w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full shadow-md transition-transform transform hover:scale-105">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
