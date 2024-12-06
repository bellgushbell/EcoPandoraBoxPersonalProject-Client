import React from "react";

import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function HomeAdminPage() {
    return (
        <>
            {/* BG was not full */}
            <div className="h-full w-full relative bg-gray-50 flex justify-center items-start">
                <div className="container mx-auto p-6 grid gap-5 h-full">
                    {/* <NavbarAdmin /> */}
                    <div className="grid grid-cols-4 gap-6 h-full">
                        <div className="col-span-1">
                            <SidebarAdmin />
                        </div>
                        <div className="col-span-3 h-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
