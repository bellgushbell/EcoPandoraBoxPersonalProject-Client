import React, { useState } from "react";
import useUserStore from "../../stores/user-store"; // Import Zustand store
import Swal from "sweetalert2";


function Login({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useUserStore((state) => state.login); // ดึงฟังก์ชัน login

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password }); // ส่งข้อมูลไปยังฟังก์ชัน login
            // alert("Login successful!");
            //success alert
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="/public/assets/success-green.gif" alt="Success" class="w-14 h-14" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Register Success</span>
         </div>`,
                position: "top-end",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                background: "#ffffff",
                didOpen: (toast) => {
                    const progressBar = toast.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.backgroundColor = "green";
                    }
                    toast.addEventListener("click", Swal.close);
                },
            });
            onClose(); // ปิด modal 

        } catch (error) {
            const errMsg = error.response?.data?.message || error.message;
            //alert error
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="/public/assets/fail-red.gif" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
                position: "top-end",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                background: "#ffffff",
                didOpen: (toast) => {
                    const progressBar = toast.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.backgroundColor = "#f44336";
                    }
                    toast.addEventListener("click", Swal.close);
                },
            });
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
