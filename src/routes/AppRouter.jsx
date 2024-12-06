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
import PrepareForShippingPage from "../pages/PrepareForShippingPage";
import HomeAdminPage from "../pages/Admin/HomeAdminPage";
import DashboardAdmin from "../components/Admin/DashboardAdmin";


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
            { path: "prepareforshipping", element: <PrepareForShippingPage /> },
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
            { path: "randombox", element: <BoxRandomItemPage /> },
            { path: "address", element: <AddressDeliveryPage /> },
            { path: "prepareforshipping", element: <PrepareForShippingPage /> },
        ]

    }, {
        path: "/admin",
        element: <ProtectRouter element={<HomeAdminPage />} reqRole={["ADMIN"]} />,
        children: [
            { index: true, element: <DashboardAdmin /> },
            { path: "campaigns", element: <ProtectRouter /> },
            { path: "payment", element: <PaymentPage /> },
            { path: "payment-success", element: <PaymentSuccess /> },
            { path: "randombox", element: <BoxRandomItemPage /> },
            { path: "address", element: <AddressDeliveryPage /> },
            { path: "prepareforshipping", element: <PrepareForShippingPage /> },
        ]

    },





])
export default function AppRouter() {
    return (
        <>
            <RouterProvider router={MainRouter} />
        </>
    )
}