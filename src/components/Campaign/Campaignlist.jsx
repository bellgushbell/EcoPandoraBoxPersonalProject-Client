import React, { useState, useEffect } from "react";
import axios from "axios";
import useDonationStore from "../../stores/useDonationStore";
import { useNavigate } from "react-router-dom";

function Campaignlist() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API;
    const navigate = useNavigate()
    const setCampaignId = useDonationStore((state) => state.setCampaignId); // Store setter

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get(`${API}/campaign/getlist`);
                setCampaigns(response.data.campaign);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    const handleDonateClick = (id) => {
        if (!id) {
            alert("Invalid campaign. Please try again.");
            return;
        }
        setCampaignId(id); // บันทึก campaignId ใน Store
        navigate("/payment"); // นำทางไปยังหน้าชำระเงิน
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-bold">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 py-8 p-10">
            <h2 className="text-4xl font-extrabold text-center text-green-700 mb-4 font-fredericka">
                Campaign List
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {campaigns.map((campaign) => (
                    <div
                        key={campaign.id}
                        className="relative bg-green-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={campaign.image}
                            alt={campaign.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 bg-green-100">
                            <h3 className="text-xl font-bold">{campaign.name}</h3>
                            <p className="text-gray-700 mt-2 h-[50px]">{campaign.description}</p>
                            <button
                                onClick={() => handleDonateClick(campaign.id)}
                                className="mt-4 w-full flex justify-center items-center transition-transform transform hover:scale-105"
                            >
                                <img
                                    src="/assets/donatebuttonblue.gif"
                                    alt="donatebutt"
                                    className="w-[200px] h-auto"
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Campaignlist;
