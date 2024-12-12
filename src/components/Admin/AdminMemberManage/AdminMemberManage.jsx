import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../../stores/user-store";
import Swal from "sweetalert2";

const API = import.meta.env.VITE_API;

export default function AdminMemberManage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useUserStore((state) => state.token);
    const userId = useUserStore((state) => state.user.id);

    // Fetch members
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${API}/auth/userAll`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Filter out the current logged-in user
                const filteredMembers = response.data.filter((member) => member.id !== userId);
                setMembers(filteredMembers);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching members:", err);
            }
        };
        fetchMembers();
    }, [token, userId]);

    // Update member role
    const updateRole = async (id, newRole) => {
        try {
            const response = await axios.patch(
                `${API}/auth/update-member`,
                { id, role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // success alert
            Swal.fire({
                html: `<div class="flex items-center gap-2">
               <img src="/public/assets/success-green.gif" alt="Success" class="w-14 h-14" />
               <span style="font-size: 16px; font-weight: bold; color: green;">Role updated successfully!</span>
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
            setMembers((prev) =>
                prev.map((member) =>
                    member.id === id ? { ...member, role: newRole } : member
                )
            );
        } catch (err) {
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

        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Member Management</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td className="p-2 border">{member.id}</td>
                            <td className="p-2 border">{member.email}</td>
                            <td className="p-2 border flex justify-center">{member.role}</td>
                            <td className="p-2 border text-center">
                                <select
                                    value={member.role}
                                    onChange={(e) => updateRole(member.id, e.target.value)}
                                    className="p-1 border rounded mx-auto"
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
