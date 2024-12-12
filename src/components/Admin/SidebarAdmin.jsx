import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/user-store';

function SidebarAdmin() {
    const logout = useUserStore((state) => state.logout);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true); // สถานะเปิด/ปิด Sidebar

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`bg-green-500 h-screen flex flex-col p-6 rounded-2xl shadow-2xl sticky top-0 space-y-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:w-64`}
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white text-2xl font-bold mb-4 self-end md:hidden"
                >
                    {isOpen ? '✖' : '☰'}
                </button>

                {/* Logo */}
                <div className="text-white text-2xl font-bold text-center mb-8 hidden md:block">
                    Admin Panel
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            `w-full text-lg font-semibold p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive
                                ? 'bg-[#66B3FF] text-white'
                                : 'text-[#E0E0E0] hover:bg-[#66B3FF] hover:text-white'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/user-manage"
                        className={({ isActive }) =>
                            `w-full text-lg font-semibold p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive
                                ? 'bg-[#66B3FF] text-white'
                                : 'text-[#E0E0E0] hover:bg-[#66B3FF] hover:text-white'
                            }`
                        }
                    >
                        User Manage
                    </NavLink>
                    <NavLink
                        to="/admin/shipping-manage"
                        className={({ isActive }) =>
                            `w-full text-lg font-semibold p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive
                                ? 'bg-[#66B3FF] text-white'
                                : 'text-[#E0E0E0] hover:bg-[#66B3FF] hover:text-white'
                            }`
                        }
                    >
                        Shipping Manage
                    </NavLink>
                    <NavLink
                        to="/admin/add-random-item"
                        className={({ isActive }) =>
                            `w-full text-lg font-semibold p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive
                                ? 'bg-[#66B3FF] text-white'
                                : 'text-[#E0E0E0] hover:bg-[#66B3FF] hover:text-white'
                            }`
                        }
                    >
                        Add Random Item
                    </NavLink>
                    <NavLink
                        to="/admin/items-manage"
                        className={({ isActive }) =>
                            `w-full text-lg font-semibold p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive
                                ? 'bg-[#66B3FF] text-white'
                                : 'text-[#E0E0E0] hover:bg-[#66B3FF] hover:text-white'
                            }`
                        }
                    >
                        Manage Item
                    </NavLink>
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full text-lg font-semibold p-3 mt-6 bg-red-500 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600"
                >
                    LOGOUT
                </button>
            </div>


        </div>
    );
}

export default SidebarAdmin;
