import React from "react";
import useShippingStore from "../../stores/ShippingDataStore";
import { useNavigate } from "react-router-dom";


function PrepareShipping() {
    const shippingData = useShippingStore((state) => state.shippingData);
    const navigate = useNavigate()
    console.log("Shipping Data in Zustand:", shippingData);

    if (!shippingData) {
        return <div className="flex items-center justify-center min-h-screen bg-green-100">Loading shipping data...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100 relative">
            {/* Background .gif */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/assets/background-animation-green.gif')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.8)", // เพิ่มความมืดให้พื้นหลัง
                }}
            ></div>

            {/* Content */}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg relative z-10 border border-green-300">
                <h1 className="text-3xl font-extrabold text-green-700 text-center mb-6">Shipping Details</h1>
                <div className="space-y-4">
                    <div className="text-lg">
                        <p><strong>Shipping ID:</strong> <span className="text-green-600">{shippingData.id}</span></p>
                    </div>
                    <div className="text-lg">
                        <p><strong>Address ID:</strong> <span className="text-green-600">{shippingData.addressId || "N/A (Guest)"}</span></p>
                    </div>
                    <div className="text-lg">
                        <p><strong>Received Item ID:</strong> <span className="text-green-600">{shippingData.receivedItemId}</span></p>
                    </div>
                    <div className="text-lg">
                        <p><strong>Created At:</strong> <span className="text-green-600">{new Date(shippingData.createdAt).toLocaleString()}</span></p>
                    </div>
                    <div className="text-lg">
                        <p><strong>Status:</strong> <span className="text-green-600">{shippingData.status}</span></p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/public/assets/shipping.gif" alt="shoipping-pic" className="w-[200px]" />
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        Back To Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PrepareShipping;
