import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import slidebarpic from "/assets/slideright.gif";
import useDonationStore from "../../stores/useDonationStore";
import useUserStore from "../../stores/user-store";
import { useNavigate } from "react-router-dom";
import Paymentloading from "../Loading/Paymentloading";

const API = import.meta.env.VITE_API;

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const controls = useAnimation();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const campaignId = useDonationStore((state) => state.campaignId);
    const totalPrice = useDonationStore((state) => state.totalPrice);
    const userId = useUserStore((state) => state.user?.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setErrorMessage("");

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements: elements,
                redirect: "if_required",
            });

            setIsLoading(true);

            if (error) {
                setErrorMessage(error.message);
                setIsLoading(false);
                return;
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
                console.log("Payment succeeded:", paymentIntent.id);

                const payload = {
                    totalPrice,
                    userId: userId || null,
                    campaignId,
                    paymentIntentId: paymentIntent.id,
                };

                console.log("Sending data to backend:", payload);

                await axios.post(`${API}/payment/success`, payload);
                console.log("Payment success recorded in backend!");
                setIsLoading(false);
                navigate("/payment-success");
            } else {
                throw new Error("Payment not completed.");
            }
        } catch (err) {
            setErrorMessage(err.response?.data?.message || err.message);
            console.error("Backend error:", err.response?.data || err.message);
        } finally {
            controls.start({ x: 0 });
            setIsLoading(false);
        }
    };

    let debounceTimeout;
    const handleSlideEnd = async (event, info) => {
        const offset = info.offset.x;
        const sliderWidth = 150;
        if (offset >= sliderWidth * 0.8) {
            if (isSubmit) return;
            setIsSubmit(true);
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(async () => {
                await handleSubmit(event); // Call submit function only once after debounce
            }, 300);
        } else if (offset <= sliderWidth * 0.25) {
            setIsSubmit(false);
        }
    };
    // เช็คสถานะโหลดดิ้ง
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Paymentloading /> {/* แสดงโหลดดิ้ง */}
            </div>
        );
    }
    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col p-6 bg-white rounded-lg shadow-md space-y-4"
            onSubmit={handleSubmit}
        >
            <h3 className="text-lg font-semibold">Complete Your Payment</h3>
            <PaymentElement />

            <div className="flex justify-center w-full">
                <div className="relative bg-gray-300 rounded-full h-12 mt-6 w-full mx-auto">
                    <motion.div
                        className="h-12 bg-gradient-to-r from-green-400  to-green-600 rounded-full flex items-center justify-center text-white font-semibold relative z-10 cursor-pointer "
                        drag="x"
                        dragConstraints={{ left: 0, right: 150 }}
                        onDrag={handleSlideEnd}
                        style={{ width: "130px" }}
                        whileTap={{ cursor: "grabbing" }}
                        animate={controls}
                    >
                        Slide to Pay
                        <img
                            src={slidebarpic}
                            alt="slide button"
                            className="absolute top-20 transform -translate-y-1/2 right-4"
                        />
                    </motion.div>
                </div>
            </div>

            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </motion.form>
    );
}
