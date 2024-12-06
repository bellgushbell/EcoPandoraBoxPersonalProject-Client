import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useReceivedItemStore from '../../stores/ReceivedItemStore';
import { useNavigate } from 'react-router-dom';
import useShippingStore from '../../stores/ShippingDataStore'


const API = import.meta.env.VITE_API;


function AddressRecieveItem() {
    const [address, setAddress] = useState({
        fullName: '',
        addressLine: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const [addressId, setAddressId] = useState(null);
    const [userId, setUserId] = useState(null);

    // ดึง receivedItemId จาก Zustand Store
    const receivedItemId = useReceivedItemStore((state) => state.receivedItemId);
    const navigate = useNavigate()
    const setShippingData = useShippingStore((state) => state.setShippingData);


    useEffect(() => {
        const fetchUserAndAddress = async () => {
            try {
                // ดึงข้อมูล userId จาก Local Storage
                const user = JSON.parse(localStorage.getItem('stateUserData'));
                const currentUserId = user?.user?.id || null;
                setUserId(currentUserId);
                console.log('Fetched userId:', currentUserId);

                // ถ้ามี userId ให้ดึงข้อมูลที่อยู่จาก Backend
                if (currentUserId) {
                    const addressResponse = await axios.get(`${API}/address/get-address`, {
                        params: { userId: currentUserId },
                    });
                    if (addressResponse.data) {
                        setAddress(addressResponse.data); // ตั้งค่า address จาก Backend
                        console.log('Fetched address:', addressResponse.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching user or address:', error);
            }
        };

        fetchUserAndAddress();
    }, []);

    // ฟังก์ชันสำหรับดึง addressId จาก Backend
    const fetchAddressId = async () => {
        try {
            if (userId) {
                // ถ้ามี userId ให้ดึง addressId สำหรับ User ที่ล็อกอิน
                const response = await axios.get(`${API}/address/get-address-id`, {
                    params: { userId },
                });
                if (response.data.addressId) {
                    setAddressId(response.data.addressId); // ตั้งค่า addressId
                    console.log('Fetched addressId:', response.data.addressId);
                }
            } else {
                // ถ้าเป็น Guest ให้สร้าง address ใหม่และดึง addressId
                const response = await axios.post(`${API}/address/get-address-id`, address);
                if (response.data.addressId) {
                    setAddressId(response.data.addressId); // ตั้งค่า addressId
                    console.log('Fetched addressId for guest:', response.data.addressId);
                }
            }
        } catch (error) {
            console.error('Error fetching address ID:', error);
        }
    };

    // ฟังก์ชันสำหรับอัปเดตค่าในฟอร์ม
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    // ฟังก์ชันสำหรับบันทึกที่อยู่
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ส่งข้อมูลที่อยู่ไปยัง Backend เพื่อบันทึก
            const response = await axios.post(`${API}/address/save-address`, {
                ...address,
                userId: userId || null, // ถ้าไม่มี userId (Guest) ให้ส่ง null
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    // ฟังก์ชันสำหรับสร้าง Shipping
    const handleShipping = async () => {
        try {
            // ตรวจสอบว่าได้รับไอเท็มหรือยัง
            if (!receivedItemId) {
                alert('No item received. Please open the box first.');
                return;
            }



            console.log('Data to create shipping:', {
                userId,
                addressId,
                receivedItemId,
            });

            // ส่งข้อมูลไปยัง Backend เพื่อสร้าง Shipping
            const response = await axios.post(`${API}/shipping/create`, {
                userId: userId || null, // ถ้าไม่มี userId (Guest) ให้ส่ง null
                addressId, // ใช้ addressId ที่ดึงมาได้จาก fetchAddressId
                receivedItemId, //  Zustand เก็บ receivedItemId
            });
            console.log("ShippingData", response.data.shipping)
            setShippingData(response.data.shipping);
            alert(response.data.message); // แสดงข้อความแจ้งเตือน
            navigate("/prepareforshipping")
        } catch (error) {
            console.error('Error creating shipping:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-green-500">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Delivery Address</h2>
                {/* ฟอร์มสำหรับกรอกที่อยู่ */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={address.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="addressLine">
                            Address Line
                        </label>
                        <input
                            type="text"
                            id="addressLine"
                            name="addressLine"
                            value={address.addressLine}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={address.city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="postalCode">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={address.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                        Save Address
                    </button>
                </form>
                {/* ปุ่มสำหรับสร้าง Shipping */}
                <button
                    onClick={handleShipping}
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Proceed to Shipping
                </button>
            </div>
        </div>
    );
}

export default AddressRecieveItem;
