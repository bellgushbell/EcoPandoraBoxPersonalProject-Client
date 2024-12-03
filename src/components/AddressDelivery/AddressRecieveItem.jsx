import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API;

function AddressRecieveItem() {
    const [address, setAddress] = useState({
        fullName: '',
        addressLine: '',
        city: '',
        postalCode: '',
        phone: '',
    });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // สมมติว่า userId มาจาก Zustand หรือ Auth State
        const fetchUserId = async () => {
            const user = JSON.parse(localStorage.getItem('stateUserData'));
            setUserId(user?.user?.id || null);
        };
        fetchUserId();

        // ดึงที่อยู่จาก Backend
        const fetchAddress = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`${API}/address/get-address`, {
                        params: { userId },
                    });
                    if (response.data) {
                        setAddress(response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };
        fetchAddress();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('stateUserData'));
            const userId = user?.user?.id || null; // ตรวจสอบ userId

            const response = await axios.post(`${API}/address/save-address`, {
                ...address,
                userId: userId || null, // ส่ง null ถ้าไม่มี userId
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="addressLine">Address Line</label>
                    <input
                        type="text"
                        id="addressLine"
                        name="addressLine"
                        value={address.addressLine}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={address.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Save Address
                </button>
            </form>
        </div>
    );
}

export default AddressRecieveItem;
