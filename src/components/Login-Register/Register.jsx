import React from "react";

function Register({ isOpen, onClose }) {
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
                <form>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">First Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">Phone</label>
                        <input
                            type="phone"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Insert your phone"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">Gender</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="mr-2"
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Create your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-white">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full shadow-md transition-transform transform hover:scale-105">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
