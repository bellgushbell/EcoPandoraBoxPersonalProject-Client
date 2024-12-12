import React, { useState } from 'react';
import axios from 'axios';
import AddPicture from './AddPicture'; // ใช้คอมโพเนนต์ AddPicture
import useUserStore from '../../../stores/user-store';
import Swal from "sweetalert2";
import AdditemLoading from '../../Loading/AdditemLoading';

const API = import.meta.env.VITE_API;

function AdminAddItem() {
    const [isLoading, setIsLoading] = useState(false);
    const token = useUserStore((state) => state.token);
    const [file, setFile] = useState(null);
    const [input, setInput] = useState({
        name: '',
        description: '',
        priceRange: '',
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('priceRange', input.priceRange);
        if (file) formData.append('image', file);

        try {
            setIsLoading(true)
            await axios.post(`${API}/randomitems/create-randomItem`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // toast.success('Random Item added successfully!');
            // success alert
            Swal.fire({
                html: `<div class="flex items-center gap-2">
               <img src="/public/assets/success-green.gif" alt="Success" class="w-14 h-14" />
               <span style="font-size: 16px; font-weight: bold; color: green;">Random Item added successfully!</span>
             </div>`,
                position: "top-end",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                background: "#ffffff",
                didOpen: (toast) => {
                    const progressBar = toast.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.backgroundColor = "green";
                    }
                    toast.addEventListener("click", Swal.close);
                },
            });
            setInput({ name: '', description: '', priceRange: '' });
            setFile(null);
        } catch (error) {
            const errMsg = error.response?.data?.message || error.message;
            //alert error
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="/public/assets/fail-red.gif" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
                position: "top-end",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                background: "#ffffff",
                didOpen: (toast) => {
                    const progressBar = toast.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.backgroundColor = "#f44336";
                    }
                    toast.addEventListener("click", Swal.close);
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <AdditemLoading />
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Add Random Item</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
            >
                <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="description"
                    value={input.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="priceRange"
                    value={input.priceRange}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Select Price Range
                    </option>
                    <option value="10">10</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                    <option value="10000">10,000</option>
                </select>
                <AddPicture file={file} setFile={setFile} />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-transform transform hover:scale-105"
                    >
                        Add Item
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddItem;
