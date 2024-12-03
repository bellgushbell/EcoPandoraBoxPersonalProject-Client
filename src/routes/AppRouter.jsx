import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProtectRouter from "./ProtectRouter";
import PageNotFound from "./PageNotFound"
import Unauthorization from "./Unauthorization"
import Homepage from "../pages/Homepage";
import CampaignsPage from "../pages/CampaignsPage";
import PaymentPage from "../pages/PaymentPage";
import PaymentSuccess from "../components/DonatePayment/PaymentSuccess";
import BoxRandomItemPage from "../pages/BoxRandomItemPage";
import AddressDeliveryPage from "../pages/AddressDeliveryPage";


const MainRouter = createBrowserRouter([

    {
        path: "/",
        element: <Outlet />,
        children: [
            { index: true, element: <Homepage /> },
            { path: "campaigns", element: <CampaignsPage /> },
            { path: "payment", element: <PaymentPage /> },
            { path: "payment-success", element: <PaymentSuccess /> },
            { path: "randombox", element: <BoxRandomItemPage /> },
            { path: "address", element: <AddressDeliveryPage /> },
            { path: "*", element: <PageNotFound /> },
            { path: '/unauthorization', element: <Unauthorization /> },

        ]

    },
    {
        path: "/user",
        element: <Outlet />,
        children: [
            { index: true, element: <Homepage /> },
            { path: "campaigns", element: <ProtectRouter element={<CampaignsPage />} reqRole={'USER'} /> },
            { path: "payment", element: <PaymentPage /> },
            { path: "payment-success", element: <PaymentSuccess /> },
            { path: "address", element: <AddressDeliveryPage /> },
            { path: "randombox", element: <BoxRandomItemPage /> },
        ]

    }




])
export default function AppRouter() {
    return (
        <>
            <RouterProvider router={MainRouter} />
        </>
    )
}