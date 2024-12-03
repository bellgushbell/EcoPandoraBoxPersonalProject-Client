import React, { useState } from "react";
import Login from "../Login-Register/Login";
import Register from "../Login-Register/Register";

function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <nav className="bg-green-600 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* โลโก้ */}
                <div className="text-2xl font-bold">
                    Eco Pandora Box
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
                        <a href="/about" className="hover:text-gray-300">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className="hover:text-gray-300">
                            Contact
                        </a>
                    </li>
                </ul>

                {/* ปุ่มสมัครสมาชิกและล็อกอิน */}
                <div className="hidden md:flex gap-4 items-center">
                    <button
                        onClick={() => setIsRegisterOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                    >
                        Log In
                    </button>

                    {/* Modal สำหรับ Login */}
                    <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

                    {/* Modal สำหรับ Register */}
                    <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />


                    {/* Guest / User Profile */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 text-white hover:text-gray-300">
                            <img
                                src="https://via.placeholder.com/32"
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                            <span>Guest</span>
                        </button>
                        {/* Dropdown เมนู */}
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-md hidden group-hover:block">
                            <div className="px-4 py-2 border-b">
                                <p className="text-sm font-bold">user@example.com</p>
                            </div>
                            <ul>
                                <li>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Hamburger Menu (สำหรับมือถือ) */}
                <div className="md:hidden">
                    <button id="hamburgerMenu" className="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>


        </nav>
    );
}

export default Navbar;
