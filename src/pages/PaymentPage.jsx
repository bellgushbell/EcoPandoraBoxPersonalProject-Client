import React, { useState, useEffect } from "react";
import PaymentProvider from "../components/DonatePayment/PaymentProvider";
import CheckoutForm from "../components/DonatePayment/CheckoutForm";
import Navbar from "../components/Nav-Footer/Navbar";
import useDonationStore from "../stores/useDonationStore";

export default function PaymentPage() {
    const [localTotalPrice, setLocalTotalPrice] = useState(10); // เก็บสถานะในหน้าเพจ
    const setTotalPrice = useDonationStore((state) => state.setTotalPrice); // ฟังก์ชันอัปเดต totalPrice ใน Zustand

    const handleInputChange = (e) => {
        const value = parseFloat(e.target.value) || null; // แปลงค่าจาก input เป็นตัวเลข
        setLocalTotalPrice(value);
    };

    useEffect(() => {
        // อัปเดตค่า totalPrice ใน Zustand Store ทุกครั้งที่ localTotalPrice เปลี่ยน
        setTotalPrice(localTotalPrice);
    }, [localTotalPrice, setTotalPrice]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <Navbar />


            <div className="flex flex-col items-center justify-center flex-grow py-8">

                <h3 className=" text-4xl font-bold font-fredericka text-green-800">PayMent</h3>


                <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg space-y-4">

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="donationAmount" className="text-xl font-semibold">
                            Enter Donation Amount (THB):
                        </label>
                        <input
                            id="donationAmount"
                            type="number"
                            min="0"
                            className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={localTotalPrice}
                            onChange={handleInputChange}
                            placeholder="Enter amount to donate"
                        />
                    </div>

                    {/* Payment Form */}
                    <PaymentProvider totalPrice={localTotalPrice}>
                        <CheckoutForm />
                    </PaymentProvider>
                </div>
            </div>
        </div>
    );
}
