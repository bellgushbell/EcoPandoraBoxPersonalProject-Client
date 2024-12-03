import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";

function BoxGallery() {
    const [campaigns, setCampaigns] = useState([]); // เก็บข้อมูลแคมเปญที่ดึงมา
    const [selectedBox, setSelectedBox] = useState(null);
    const API = import.meta.env.VITE_API;

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get(`${API}/campaign/getlist`);
                setCampaigns(response.data.campaign); // เก็บข้อมูลแคมเปญใน state
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        };

        fetchCampaigns();
    }, []); // ดึงข้อมูลเมื่อ component ถูก mount

    // คำนวณตำแหน่งของกล่องให้จัดเรียงตรง
    const calculatePosition = (index, total) => {
        const spacing = 2.5; // ระยะห่างระหว่างกล่อง
        const start = -((total - 1) * spacing) / 2; // คำนวณจุดเริ่มต้น
        return [start + index * spacing, 0, 0]; // ตำแหน่งในแกน X
    };

    return (
        <>
            {campaigns.map((campaign, index) => (
                <Box
                    key={index}
                    position={calculatePosition(index, campaigns.length)} // จัดตำแหน่งกล่อง
                    imageUrl={campaign.image} // ใช้รูปจาก API
                    isSelected={selectedBox === index}
                    name={campaign.name}
                    onClick={() =>
                        setSelectedBox(selectedBox === index ? null : index)
                    }
                />
            ))}
        </>
    );
}

export default BoxGallery;
