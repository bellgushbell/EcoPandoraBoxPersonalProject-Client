import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user-store";
import axios from "axios";
import Login from "../../components/Login-Register/Login.jsx";
import Register from "../../components/Login-Register/Register.jsx";
import Uploadloading from "../Loading/UploadProfileLoading.jsx"
import Swal from "sweetalert2";

const API = import.meta.env.VITE_API;

function Navbar() {
    const navigate = useNavigate();
    const { user, logout, token } = useUserStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hovering, setHovering] = useState(false);

    // State สำหรับเปิด/ปิด Modal
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsLoading(true)
            const formData = new FormData();
            formData.append("avatar", file);

            const response = await axios.post(`${API}/auth/upload-avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.avatarUrl) {
                useUserStore.setState((state) => ({
                    user: { ...state.user, profileImage: response.data.avatarUrl },
                }));
                // success alert
                Swal.fire({
                    html: `<div class="flex items-center gap-2">
               <img src="/public/assets/success-green.gif" alt="Success" class="w-14 h-14" />
               <span style="font-size: 16px; font-weight: bold; color: green;">Picture Upload Success</span>
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
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
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
            })

        } finally {
            setIsLoading(false);
        }
    };


    // ฟังก์ชันสำหรับเลื่อนหน้าจอไปยัง "Why Donate with Us?"
    const scrollToWhyDonate = () => {
        const section = document.getElementById("why-donate");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    // ฟังก์ชันสำหรับเลื่อนหน้าจอไปยัง "RewardBox"
    const scrollToRule = () => {
        const section = document.getElementById("rewardtier");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };
    console.log(user)

    return (
        <nav className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* โลโก้ */}
                <div
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src="/assets/LogoEcoPanDoraBox.png" alt="logo" className="w-[200px]" />
                </div>

                {/* เมนู */}
                <ul className="hidden md:flex gap-6">
                    <li>
                        <a href="/" className="hover:text-gray-300">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/campaigns" className="hover:text-gray-300">
                            Campaigns
                        </a>
                    </li>
                    <li>
                        <button
                            className="hover:text-gray-300 cursor-pointer"
                            onClick={scrollToWhyDonate}
                        >
                            About Us
                        </button>
                    </li>
                    <li>
                        <button
                            className="hover:text-gray-300 cursor-pointer"
                            onClick={scrollToRule}
                        >
                            Reward Tiers
                        </button>
                    </li>
                    {user?.role == "ADMIN" && (
                        <li>
                            <a href="/admin" className="hover:text-gray-300 text-yellow-300">
                                Admin
                            </a>
                        </li>
                    )}
                </ul>

                {/* Avatar, Guest หรือปุ่ม Login/Sign Up */}
                <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {user ? (
                        <>
                            {/* แสดง Avatar และชื่อ */}
                            <button
                                className="flex items-center gap-2"
                                onMouseEnter={() => setHovering(true)}
                            >
                                <img
                                    src={user.profileImage || "https://via.placeholder.com/32"}
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                                <span>{user.firstName}</span>
                            </button>

                            {/* Dropdown */}
                            {(dropdownOpen || hovering) && (
                                <div
                                    className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-md w-64 z-10"
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setDropdownOpen(false)}
                                >
                                    <div className="px-4 py-2 border-b">
                                        <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>
                                        <p className="text-sm">{user.email}</p>
                                    </div>
                                    <ul>
                                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                            {isLoading ? (
                                                <div className="flex justify-center">
                                                    <Uploadloading /> {/* แสดงโหลดดิ้งเฉพาะส่วนอัปโหลด */}
                                                </div>
                                            ) : (
                                                <label className="cursor-pointer block text-center">
                                                    Upload Avatar
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                            )}
                                        </li>
                                        <li className="px-4 py-2 hover:bg-red-600 bg-red-500 text-white text-center cursor-pointer rounded">
                                            <button onClick={() => logout()}>
                                                Log Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            {/* สำหรับ Guest */}
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://via.placeholder.com/32"
                                    alt="Guest Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span>Guest</span>
                            </div>
                            {/* ปุ่ม Login และ Sign Up */}
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal สำหรับ Login */}
            {isLoginOpen && (
                <Login
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                />
            )}

            {/* Modal สำหรับ Register */}
            {isRegisterOpen && (
                <Register
                    isOpen={isRegisterOpen}
                    onClose={() => setIsRegisterOpen(false)}
                />
            )}
        </nav>
    );
}

export default Navbar;
