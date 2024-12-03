import React, { useEffect, useState } from "react";

function RealTimeStats() {
    const [totalDonations, setTotalDonations] = useState(0);

    useEffect(() => {
        // จำลองการอัปเดตยอดบริจาค
        const interval = setInterval(() => {
            setTotalDonations((prev) => prev + Math.floor(Math.random() * 1000)); // เพิ่มค่าจำลอง
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative bg-gradient-to-br from-green-400 via-green-500 to-green-700 text-white py-16 px-8">
            <h3 className="text-3xl font-bold text-white">
                Total Donations
            </h3>
            <p className="text-5xl font-extrabold text-green-100 mt-4">
                {totalDonations.toLocaleString()} THB
            </p>
        </div>
    );
}

export default RealTimeStats;
