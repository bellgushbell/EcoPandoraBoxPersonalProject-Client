import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useReceivedItemStore from '../../stores/ReceivedItemStore';
import { useNavigate } from 'react-router-dom';
import useShippingStore from '../../stores/ShippingDataStore';
import useUserStore from '../../stores/user-store';
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API;

function AddressRecieveItem() {
    // สถานะสำหรับจัดเก็บข้อมูลที่อยู่
    const [address, setAddress] = useState({
        fullName: '',
        addressLine: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const [addressId, setAddressId] = useState(null); // เก็บ addressId
    const [userId, setUserId] = useState(null); // เก็บ userId
    const [isAddressSaved, setIsAddressSaved] = useState(false); // ตรวจสอบสถานะการบันทึกที่อยู่
    const receivedItemId = useReceivedItemStore((state) => state.receivedItemId); // ดึง receivedItemId จาก Zustand Store
    const navigate = useNavigate(); // สำหรับนำทางไปหน้าถัดไป
    const setShippingData = useShippingStore((state) => state.setShippingData); // เก็บข้อมูล shipping ใน Zustand Store
    // ดึง email จาก useUserStore
    const email = useUserStore((state) => state.user?.email);


    // ใช้ useEffect เพื่อดึง userId และที่อยู่จาก LocalStorage
    useEffect(() => {
        const fetchUserAndAddress = async () => {
            try {
                // ดึงข้อมูล userId จาก LocalStorage
                const userData = JSON.parse(localStorage.getItem('stateUserData'));
                const currentUserId = userData?.state?.user?.id || null;

                if (currentUserId) {
                    setUserId(currentUserId); // ตั้งค่า userId
                    console.log('Fetched userId:', currentUserId);

                    // ดึงข้อมูลที่อยู่จาก Backend
                    const addressResponse = await axios.get(`${API}/address/get-address`, {
                        params: { userId: currentUserId },
                    });
                    if (addressResponse.data) {
                        setAddress(addressResponse.data); // ตั้งค่าข้อมูลที่อยู่
                        setAddressId(addressResponse.data.id); // ตั้งค่า addressId
                        setIsAddressSaved(true); // ตั้งสถานะว่าที่อยู่ถูกบันทึกแล้ว
                    }
                } else {
                    console.error('No userId found in stateUserData.');
                }
            } catch (error) {
                console.error('Error fetching user or address:', error);
            }
        };

        fetchUserAndAddress(); // เรียกใช้ฟังก์ชันเมื่อ Component ถูก mount
    }, []);

    // ฟังก์ชันสำหรับอัปเดตข้อมูลในฟอร์ม
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value || '' }); // อัปเดตค่าใน state ของ address
    };

    // ฟังก์ชันสำหรับบันทึกที่อยู่
    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันการ refresh หน้า
        try {
            // ตรวจสอบ userId ก่อนส่ง request
            const userData = JSON.parse(localStorage.getItem('stateUserData'));
            const currentUserId = userData?.state?.user?.id || null;

            console.log('Submitting Address:', { userId: currentUserId, ...address });

            // ตรวจสอบข้อมูลว่าครบถ้วนก่อนส่ง
            if (!address.fullName || !address.addressLine || !address.city || !address.postalCode || !address.phone) {
                // alert('Please fill out all fields.');
                //alert error
                Swal.fire({
                    html: `<div class="flex items-center gap-2">
           <img src="/public/assets/fail-red.gif" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">Please fill out all fields</span>
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

            const response = await axios.post(`${API}/address/save-address`, {
                ...address,
                userId: currentUserId || null, // ถ้าไม่มี userId ให้ส่ง null
            });

            if (response.data.addressId) {
                setAddressId(response.data.addressId); // ตั้งค่า addressId ที่ตอบกลับจาก Backend
                setIsAddressSaved(true); // ตั้งสถานะว่าที่อยู่ถูกบันทึกแล้ว
                toast.error(response.data.message); // แสดงข้อความเมื่อบันทึกสำเร็จ
            }
            // success alert
            Swal.fire({
                html: `<div class="flex items-center gap-2">
               <img src="/public/assets/success-green.gif" alt="Success" class="w-14 h-14" />
               <span style="font-size: 16px; font-weight: bold; color: green;">Save Address Success</span>
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
            setIsAddressSaved(true);
            // toast.success("save address success")
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

    // ฟังก์ชันสำหรับสร้าง Shipping
    const handleShipping = async () => {
        try {

            // ตรวจสอบข้อมูลก่อนสร้าง Shipping
            const userData = JSON.parse(localStorage.getItem('stateUserData'));
            const currentUserId = userData?.state?.user?.id || null;

            const shippingData = {
                userId: currentUserId || null,
                addressId: addressId || null,
                receivedItemId,
                address: !currentUserId ? address : undefined, // ส่งข้อมูลที่อยู่สำหรับ Guest
                email: email || null
            };

            console.log('Creating Shipping:', shippingData);

            const response = await axios.post(`${API}/shipping/create`, shippingData);
            setShippingData(response.data.shipping); // เก็บข้อมูล shipping ใน Zustand Store
            // alert(response.data.message); // แสดงข้อความเมื่อสร้างสำเร็จ
            //success alert
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="/public/assets/success-green.gif" alt="Success" class="w-14 h-14" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Create Shipping Success</span>
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
            navigate('/prepareforshipping'); // นำทางไปยังหน้า Shipping Details
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
                            value={address.fullName || ''}
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
                            value={address.addressLine || ''}
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
                            value={address.city || ''}
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
                            value={address.postalCode || ''}
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
                            value={address.phone || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    {/* ปุ่มสำหรับบันทึกที่อยู่ */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                        Save Address
                    </button>
                </form>
                {/* แสดงปุ่ม Proceed to Shipping เมื่อบันทึกที่อยู่สำเร็จ */}
                {isAddressSaved && (
                    <button
                        onClick={handleShipping}
                        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Proceed to Shipping
                    </button>
                )}
            </div>
        </div>
    );
}

export default AddressRecieveItem;
