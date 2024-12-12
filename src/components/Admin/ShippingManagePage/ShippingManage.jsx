import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

const API = import.meta.env.VITE_API;

function ShippingManage() {
    const [shippings, setShippings] = useState([]); // รายการจัดส่ง
    const [loading, setLoading] = useState(false); // สถานะการโหลด
    const [error, setError] = useState(null); // ข้อผิดพลาด

    // ดึงข้อมูลรายการจัดส่ง
    useEffect(() => {
        const fetchShipping = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API}/shipping/details`);
                setShippings(response.data); // ตั้งค่ารายการจัดส่ง
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch shipping details.');
                setLoading(false);
            }
        };

        fetchShipping();
    }, []);

    // อัปเดตสถานะจัดส่ง
    const updateStatus = async (shippingId, newStatus) => {
        try {
            await axios.patch(`${API}/shipping/update-status`, {
                shippingId,
                status: newStatus,
            });
            // อัปเดตรายการจัดส่งในหน้าจอ
            setShippings((prevShippings) =>
                prevShippings.map((item) =>
                    item.id === shippingId ? { ...item, status: newStatus } : item
                )
            );
            // success alert
            Swal.fire({
                html: `<div class="flex items-center gap-2">
               <img src="/public/assets/success-green.gif" alt="Success" class="w-14 h-14" />
               <span style="font-size: 16px; font-weight: bold; color: green;">Status updated successfully.</span>
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
        } catch (err) {
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

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Shipping Management</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2 text-left">Shipping ID</th>
                            <th className="px-4 py-2 text-left">Address ID</th>
                            <th className="px-4 py-2 text-left">Random Item</th>
                            <th className="px-4 py-2 text-left">Created At</th>
                            <th className="px-4 py-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shippings.map((shipping) => (
                            <tr key={shipping.id} className="border-t">
                                <td className="px-4 py-2">{shipping.id}</td>
                                <td className="px-4 py-2">{shipping.addressId || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    {shipping.receivedItem?.randomItem
                                        ? shipping.receivedItem.randomItem.name
                                        : 'N/A'}
                                </td>
                                <td className="px-4 py-2">{new Date(shipping.createdAt).toLocaleString()}</td>
                                <td className="px-4 py-2 text-center">
                                    <select
                                        value={shipping.status}
                                        onChange={(e) => updateStatus(shipping.id, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELED">Canceled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShippingManage;
