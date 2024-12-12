import React, { useState } from "react";
import useUserStore from "../../stores/user-store"; // Import Zustand store
import Swal from "sweetalert2";

function Register({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const register = useUserStore((state) => state.register); // ดึงฟังก์ชัน register

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            // alert("Passwords do not match!");

            //alert error
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="/public/assets/fail-red.gif" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">Passwords do not match!</span>
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
            return;
        }

        try {
            await register(formData); // ส่งข้อมูลไปยังฟังก์ชัน register
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
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Sign Up</h2>
                <form onSubmit={handleRegister}>
                    {/* Email, First Name, Last Name, Phone */}
                    {["email", "firstName", "lastName", "phone"].map((key) => (
                        <div className="mb-4" key={key}>
                            <label className="block mb-2 text-sm font-bold text-white">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                className="text-black w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                                placeholder={`Enter your ${key}`}
                                required
                            />
                        </div>
                    ))}

                    {/* Gender Selection */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">Gender</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* Password and Confirm Password */}
                    {["password", "confirmPassword"].map((key) => (
                        <div className="mb-4" key={key}>
                            <label className="block mb-2 text-sm font-bold text-white">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <input
                                type="password"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                className="text-black w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                                placeholder={`Enter your ${key}`}
                                required
                            />
                        </div>
                    ))}

                    <button className="bg-blue-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full shadow-md transition-transform transform hover:scale-105">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
