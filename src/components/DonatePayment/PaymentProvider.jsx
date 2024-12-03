// PaymentProvider.js
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51QHddSIdZP6xs5KfcWePGPewYV4O84Muncrv0bXmWW7vgGfoiep9oxhu0inJuFyCvwRK49CxMfD8jxGwbp0xPhKS00Bjvf926V"); // ใส่ Public Key 
const API = import.meta.env.VITE_API

export default function PaymentProvider({ children, totalPrice }) {
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.post(`${API}/payment/create-payment-intent`, {
                    totalPrice,
                });
                setClientSecret(response.data.clientSecret);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching client secret:", error);
                setLoading(false);
            }
        };
        fetchClientSecret();
    }, []);

    if (!clientSecret || loading) {
        return <div>Loading Payment...</div>;
    }

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#4CAF50",
            borderRadius: "8px",
            fontSizeBase: "16px",
        },
    };

    return (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
            {children}
        </Elements>
    );
}
