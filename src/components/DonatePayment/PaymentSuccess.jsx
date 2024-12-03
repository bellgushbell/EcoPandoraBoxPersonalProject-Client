import React, { useEffect, useState } from "react";
import Navbar from "../Nav-Footer/Navbar";
import useDonationStore from "../../stores/useDonationStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

function PaymentSuccess() {
    // ดึงข้อมูลจาก Zustand Store
    const totalPrice = useDonationStore((state) => state.totalPrice);
    const campaignId = useDonationStore((state) => state.campaignId);
    const navigate = useNavigate()
    const [campaignName, setCampaignName] = useState("");

    // ดึงชื่อแคมเปญจาก API
    useEffect(() => {
        const fetchCampaignName = async () => {
            try {
                const response = await axios.get(`${API}/campaign/getlist`);
                const campaign = response.data.campaign.find((item) => item.id === campaignId);
                if (campaign) {
                    setCampaignName(campaign.name);
                }
            } catch (error) {
                console.error("Error fetching campaign name:", error.message);
            }
        };

        if (campaignId) {
            fetchCampaignName();
        }
    }, [campaignId]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex flex-grow items-center justify-center text-center">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto space-y-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                        alt="Success"
                        className="w-24 h-24 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-green-600">
                        Payment Successful!
                    </h1>
                    <ul className="text-lg mt-4 text-gray-700 space-y-2 text-left">
                        <li>
                            <span className="font-semibold text-gray-800">Campaign Name:</span> {campaignName || "Loading..."}
                        </li>
                        <li>
                            <span className="font-semibold text-gray-800">Campaign ID:</span> {campaignId}
                        </li>
                        <li>
                            <span className="font-semibold text-gray-800">Total Donation:</span> {totalPrice} THB
                        </li>
                    </ul>
                    <p className="text-lg mt-4 text-gray-700">
                        Thank you for your generous donation! Your contribution will help create a meaningful impact. Let's see what reward awaits you!
                    </p>
                    <button
                        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
                        onClick={() => (navigate("/randombox"))}
                    >
                        ไปหน้ากล่องสุ่มของรางวัลต่อไป
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
