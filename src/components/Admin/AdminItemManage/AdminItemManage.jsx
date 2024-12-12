import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useUserStore from "../../../stores/user-store"; // ดึง token จาก Zustand Store
import EditItemLoading from "../../Loading/EditItemLoading"
const API = import.meta.env.VITE_API;

function AdminItemManage() {
    const [items, setItems] = useState([]); // รายการสินค้าทั้งหมด
    const [editMode, setEditMode] = useState(null); // เก็บ id ของ item ที่กำลังแก้ไข
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priceRange: "",
        image: null,
    });
    const [loadingCardId, setLoadingCardId] = useState(null); // เก็บ id ของการ์ดที่กำลังโหลด
    const token = useUserStore((state) => state.token); // ดึง token จาก Zustand Store

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${API}/randomitems/getAll-randomItems`);
            setItems(response.data); // ตั้งค่า items
        } catch (error) {
            console.error("Error fetching items:", error);
            toast.error("Failed to fetch items");
        }
    };

    const handleEditClick = (item) => {
        setEditMode(item.id); // เปิดโหมดแก้ไขสำหรับ item ที่เลือก
        setFormData({
            name: item.name,
            description: item.description,
            priceRange: item.priceRange,
            image: null,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const saveEdit = async (id) => {
        setLoadingCardId(id); // เปิดโหลดดิ้งสำหรับการ์ดนี้
        try {
            const form = new FormData();
            form.append("id", id);
            form.append("name", formData.name);
            form.append("description", formData.description);
            form.append("priceRange", formData.priceRange);
            if (formData.image) form.append("image", formData.image);

            await axios.patch(`${API}/randomitems/edit-randomItem`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Swal.fire("Success", "Item updated successfully", "success");
            fetchItems();
            setEditMode(null); // ปิดโหมดแก้ไข
        } catch (error) {
            Swal.fire("Error", "Failed to update item", "error");
        } finally {
            setLoadingCardId(null); // ปิดโหลดดิ้ง
        }
    };

    const deleteItem = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            setLoadingCardId(id); // เปิดโหลดดิ้งสำหรับการ์ดนี้
            try {
                await axios.delete(`${API}/randomitems/del-randomItem/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Swal.fire("Success", "Item deleted successfully", "success");
                fetchItems();
            } catch (error) {
                Swal.fire("Error", "Failed to delete item", "error");
            } finally {
                setLoadingCardId(null); // ปิดโหลดดิ้ง
            }
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-6">Admin: Manage Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-full h-[400px] group perspective"
                    >
                        <div
                            className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${editMode === item.id ? "rotate-y-180" : ""
                                }`}
                        >
                            {loadingCardId === item.id && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                                    <EditItemLoading />
                                </div>
                            )}
                            {/* Front Side */}
                            <div className="absolute inset-0 bg-white rounded-lg shadow-lg p-4 backface-hidden flex flex-col justify-between">
                                <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-40 object-cover rounded mb-2"
                                    />
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-sm">{item.description}</p>
                                    <p className="text-sm">Price Range: {item.priceRange}</p>
                                </div>
                                <div className="flex justify-center gap-4 mt-4">
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="px-4 py-2 rounded bg-blue-500 text-white hover:shadow-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="px-4 py-2 rounded bg-red-500 text-white hover:shadow-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 bg-gray-100 rounded-lg shadow-lg p-4 backface-hidden transform rotate-y-180 flex flex-col justify-between">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full mb-2"
                                        placeholder="Name"
                                    />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered w-full mb-2"
                                        placeholder="Description"
                                    />
                                    <select
                                        name="priceRange"
                                        value={formData.priceRange}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full mb-2"
                                    >
                                        <option value="">Select Price Range</option>
                                        <option value="10">10</option>
                                        <option value="100">100</option>
                                        <option value="1000">1000</option>
                                        <option value="10000">10000</option>
                                    </select>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        className="input input-bordered w-full mb-2"
                                    />
                                </div>
                                <div className="flex justify-center mt-4 gap-4">
                                    <button
                                        onClick={() => saveEdit(item.id)}
                                        className="px-4 py-2 rounded bg-green-500 text-white hover:shadow-lg"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditMode(null)}
                                        className="px-4 py-2 rounded bg-gray-500 text-white hover:shadow-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminItemManage;























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Swal from 'sweetalert2';
// import { motion } from 'framer-motion';
// import useUserStore from '../../../stores/user-store'; // ดึง token จาก Zustand Store

// const API = import.meta.env.VITE_API;

// function AdminItemManage() {
//     const [items, setItems] = useState([]); // รายการสินค้าทั้งหมด
//     const [editMode, setEditMode] = useState(null); // ไว้เก็บ id ของ item ที่กำลังแก้ไข
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         priceRange: '',
//         image: null,
//     });
//     const token = useUserStore(state => state.token); // ดึง token จาก Zustand Store

//     // โหลดข้อมูลสินค้าทั้งหมดเมื่อ component โหลด
//     useEffect(() => {
//         fetchItems();
//     }, []);

//     // ฟังก์ชันดึงข้อมูลสินค้าทั้งหมด
//     const fetchItems = async () => {
//         try {
//             const response = await axios.get(`${API}/randomitems/getAll-randomItems`);
//             setItems(response.data); // ตั้งค่า items
//         } catch (error) {
//             console.error('Error fetching items:', error);
//             toast.error('Failed to fetch items');
//         }
//     };

//     // เมื่อกดปุ่ม Edit
//     const handleEditClick = (item) => {
//         setEditMode(item.id);
//         setFormData({
//             name: item.name,
//             description: item.description,
//             priceRange: item.priceRange,
//             image: null,
//         });
//     };

//     // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     // ฟังก์ชันจัดการการเปลี่ยนภาพ
//     const handleImageChange = (e) => {
//         setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//     };

//     // ฟังก์ชันบันทึกการแก้ไขสินค้า
//     const saveEdit = async (id) => {
//         try {
//             const form = new FormData();
//             form.append('id', id);
//             form.append('name', formData.name);
//             form.append('description', formData.description);
//             form.append('priceRange', formData.priceRange);
//             if (formData.image) form.append('image', formData.image);

//             await axios.patch(`${API}/randomitems/edit-randomItem`, form, {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // ส่ง token เพื่อยืนยันตัวตน
//                 },
//             });
//             toast.success('Item updated successfully');
//             fetchItems(); // โหลดข้อมูลใหม่
//             setEditMode(null); // ปิดโหมดแก้ไข
//         } catch (error) {
//             console.error('Error updating item:', error);
//             toast.error('Failed to update item');
//         }
//     };

//     // ฟังก์ชันลบสินค้า
//     const deleteItem = async (id) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!',
//         });

//         if (result.isConfirmed) {
//             try {
//                 await axios.delete(`${API}/randomitems/del-randomItem/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // ส่ง token เพื่อยืนยันตัวตน
//                     },
//                 });
//                 toast.success('Item deleted successfully');
//                 fetchItems(); // โหลดข้อมูลใหม่
//             } catch (error) {
//                 console.error('Error deleting item:', error);
//                 toast.error('Failed to delete item');
//             }
//         }
//     };

//     return (
//         <div className="p-5">
//             <h2 className="text-2xl font-bold mb-6">Admin: Manage Items</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {items.map((item) => (
//                     <motion.div
//                         key={item.id}
//                         className="p-4 border rounded shadow"
//                         whileHover={{ scale: 1.05 }}
//                     >
//                         {editMode === item.id ? (
//                             <div>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                     className="input input-bordered w-full"
//                                     placeholder="Name"
//                                 />
//                                 <textarea
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleInputChange}
//                                     className="textarea textarea-bordered w-full mt-2"
//                                     placeholder="Description"
//                                 />
//                                 <select
//                                     name="priceRange"
//                                     value={formData.priceRange}
//                                     onChange={handleInputChange}
//                                     className="input input-bordered w-full mt-2"
//                                 >
//                                     <option value="">Select Price Range</option>
//                                     <option value="10">10</option>
//                                     <option value="100">100</option>
//                                     <option value="1000">1000</option>
//                                     <option value="10000">10000</option>
//                                 </select>
//                                 <input
//                                     type="file"
//                                     name="image"
//                                     onChange={handleImageChange}
//                                     className="input input-bordered w-full mt-2"
//                                 />
//                                 <div className="flex justify-center mt-4 gap-4">
//                                     <button
//                                         onClick={() => saveEdit(item.id)}
//                                         className="btn btn-primary"
//                                     >
//                                         Save
//                                     </button>
//                                     <button
//                                         onClick={() => setEditMode(null)}
//                                         className="btn btn-secondary"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div>
//                                 <img
//                                     src={item.image}
//                                     alt={item.name}
//                                     className="w-full h-40 object-cover rounded mb-2"
//                                 />
//                                 <h3 className="font-bold">{item.name}</h3>
//                                 <p className="text-sm">{item.description}</p>
//                                 <p className="text-sm">Price Range: {item.priceRange}</p>
//                                 <div className="flex justify-center mt-2 gap-4">
//                                     <button
//                                         onClick={() => handleEditClick(item)}
//                                         className="btn btn-primary"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => deleteItem(item.id)}
//                                         className="btn btn-danger"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default AdminItemManage;
