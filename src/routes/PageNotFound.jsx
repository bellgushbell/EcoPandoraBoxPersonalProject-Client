import React from 'react';
import pagenotfoundlogo from '../assets/PageNotFound.gif';

import Navbar from '../components/Nav-Footer/Navbar';

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <Navbar />
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Page Not Found</h1>
            <img src={pagenotfoundlogo} alt="Page Not Found" className="w-[600] h-[600px]" />
        </div>
    );
}
