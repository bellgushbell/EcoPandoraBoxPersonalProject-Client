import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import useUserStore from "../../stores/user-store";

const API = import.meta.env.VITE_API;

export default function ChatFormUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [chatBoxId, setChatBoxId] = useState(null);
    const token = useUserStore((state) => state.token);
    const socketRef = useRef(null);
    const chatBoxRef = useRef(null);

    // ดึง chatBoxId และประวัติแชท
    useEffect(() => {
        const fetchChatBoxIdAndHistory = async () => {
            try {
                // รอจน socketId พร้อมใช้งาน
                await new Promise((resolve) => {
                    const interval = setInterval(() => {
                        if (socketRef.current?.id) {
                            clearInterval(interval);
                            resolve(); // รอจน socketId มีค่า
                        }
                    }, 100);
                });

                const socketId = socketRef.current?.id;

                const { data: chatBoxData } = await axios.get(`${API}/chathistory/history/getchatBoxId`, {
                    params: { socketId },
                    headers: { Authorization: `Bearer ${token || ""}` },
                });

                setChatBoxId(chatBoxData.chatBoxId);

                if (token) {
                    const { data: chatHistory } = await axios.get(
                        `${API}/chathistory/history/${chatBoxData.chatBoxId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    setMessages(chatHistory); // ตั้งค่าประวัติแชท
                }
            } catch (error) {
                console.error("Error fetching chatBoxId or chat history:", error.response?.data || error);
            }
        };

        fetchChatBoxIdAndHistory();
    }, [token]);

    // ตั้งค่า Socket.IO
    useEffect(() => {
        const socket = io(API, {
            extraHeaders: {
                Authorization: `Bearer ${token || ""}`,
            },
        });
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Socket Connected:", socket.id); // ตรวจสอบว่า socketId ถูกสร้าง
        });

        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data.data]);
        });

        // ฟังอีเวนต์ messagesRead สำหรับอัปเดต isRead
        const handleMessagesRead = ({ chatBoxId }) => {
            if (chatBoxId === chatBoxId) {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) => ({
                        ...msg,
                        isRead: true,
                    }))
                );
            }
        };

        socket.on("messagesRead", handleMessagesRead);

        socket.emit("joinChat");

        return () => {
            socket.off("messagesRead", handleMessagesRead);
            socket.disconnect();
        };
    }, [token]);

    // Scroll ไปยังข้อความล่าสุดเมื่อเปิดแชทหรือมีข้อความใหม่
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [isOpen, messages]);

    const handleSendMessage = () => {
        if (socketRef.current && input.trim()) {
            socketRef.current.emit("message", input);
            setInput("");
        }
    };

    return (
        <div className="fixed bottom-5 right-5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full hover:bg-green-600 transition w-[80px]"
            >
                <img src="/assets/chatlogo.png" alt="chat" />
            </button>
            {isOpen && (
                <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col mt-3">
                    <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h2 className="font-bold">Chat</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            ✖
                        </button>
                    </div>
                    <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto bg-gray-100">
                        {messages.length > 0 ? (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`p-2 my-1 rounded-lg ${msg.isAdmin ? "bg-gray-300" : "bg-orange-200"
                                            }`}
                                    >
                                        {msg.message}
                                        <span className="text-xs text-gray-500 block">
                                            {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </span>
                                        {msg.isRead ? (
                                            <span className="text-green-500 text-xs">✓ Read</span>
                                        ) : (
                                            <span className="text-gray-400 text-xs">✓ Sent</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No messages yet.</p>
                        )}
                    </div>
                    <div className="p-3 border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="mt-2 bg-orange-500 text-white py-2 rounded-lg w-full hover:bg-orange-600 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


























// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import useUserStore from "../../stores/user-store";

// const API = import.meta.env.VITE_API;

// export default function ChatFormUser() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [chatBoxId, setChatBoxId] = useState(null);
//     const token = useUserStore((state) => state.token);
//     const socketRef = useRef(null);
//     const chatBoxRef = useRef(null);

//     // ดึง chatBoxId และประวัติแชท
//     useEffect(() => {
//         const fetchChatBoxIdAndHistory = async () => {
//             try {
//                 // รอจน socketId พร้อมใช้งาน
//                 await new Promise((resolve) => {
//                     const interval = setInterval(() => {
//                         if (socketRef.current?.id) {
//                             clearInterval(interval);
//                             resolve(); // รอจน socketId มีค่า
//                         }
//                     }, 100);
//                 });

//                 const socketId = socketRef.current?.id;

//                 const { data: chatBoxData } = await axios.get(`${API}/chathistory/history/getchatBoxId`, {
//                     params: { socketId },
//                     headers: { Authorization: `Bearer ${token || ""}` },
//                 });

//                 setChatBoxId(chatBoxData.chatBoxId);

//                 if (token) {
//                     const { data: chatHistory } = await axios.get(
//                         `${API}/chathistory/history/${chatBoxData.chatBoxId}`,
//                         {
//                             headers: { Authorization: `Bearer ${token}` },
//                         }
//                     );

//                     setMessages(chatHistory); // ตั้งค่าประวัติแชท
//                 }
//             } catch (error) {
//                 console.error("Error fetching chatBoxId or chat history:", error.response?.data || error);
//             }
//         };

//         fetchChatBoxIdAndHistory();
//     }, [token]);

//     // ตั้งค่า Socket.IO
//     useEffect(() => {
//         const socket = io(API, {
//             extraHeaders: {
//                 Authorization: `Bearer ${token || ""}`,
//             },
//         });
//         socketRef.current = socket;

//         socket.on("connect", () => {
//             console.log("Socket Connected:", socket.id); // ตรวจสอบว่า socketId ถูกสร้าง
//         });

//         socket.on("message", (data) => {
//             setMessages((prev) => [...prev, data.data]);
//         });

//         // ฟังอีเวนต์ messagesRead สำหรับอัปเดต isRead
//         const handleMessagesRead = ({ chatBoxId }) => {
//             if (chatBoxId === chatBoxId) {
//                 setMessages((prevMessages) =>
//                     prevMessages.map((msg) => ({
//                         ...msg,
//                         isRead: true,
//                     }))
//                 );
//             }
//         };

//         socket.on("messagesRead", handleMessagesRead);

//         socket.emit("joinChat");

//         return () => {
//             socket.off("messagesRead", handleMessagesRead);
//             socket.disconnect();
//         };
//     }, [token]);

//     // Scroll ไปยังข้อความล่าสุดเมื่อเปิดแชทหรือมีข้อความใหม่
//     useEffect(() => {
//         if (chatBoxRef.current) {
//             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//         }
//     }, [isOpen, messages]);

//     const handleSendMessage = () => {
//         if (socketRef.current && input.trim()) {
//             socketRef.current.emit("message", input);
//             setInput("");
//         }
//     };

//     return (
//         <div className="fixed bottom-5 right-5">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="rounded-full hover:bg-green-600 transition w-[80px]"
//             >
//                 <img src="/assets/chatlogo.png" alt="chat" />
//             </button>
//             {isOpen && (
//                 <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col mt-3">
//                     <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
//                         <h2 className="font-bold">Chat</h2>
//                         <button
//                             onClick={() => setIsOpen(false)}
//                             className="text-white hover:text-gray-200"
//                         >
//                             ✖
//                         </button>
//                     </div>
//                     <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto bg-gray-100">
//                         {messages.length > 0 ? (
//                             messages.map((msg, idx) => (
//                                 <div
//                                     key={idx}
//                                     className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
//                                 >
//                                     <div
//                                         className={`p-2 my-1 rounded-lg ${msg.isAdmin ? "bg-gray-300" : "bg-orange-200"
//                                             }`}
//                                     >
//                                         {msg.message}
//                                         <span className="text-xs text-gray-500 block">
//                                             {new Date(msg.createdAt).toLocaleTimeString("en-US", {
//                                                 hour: "2-digit",
//                                                 minute: "2-digit",
//                                                 hour12: true,
//                                             })}
//                                         </span>
//                                         {msg.isRead ? (
//                                             <span className="text-green-500 text-xs">✓ Read</span>
//                                         ) : (
//                                             <span className="text-gray-400 text-xs">✓ Sent</span>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-500 text-center">No messages yet.</p>
//                         )}
//                     </div>
//                     <div className="p-3 border-t">
//                         <input
//                             type="text"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="Type a message..."
//                             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                         />
//                         <button
//                             onClick={handleSendMessage}
//                             className="mt-2 bg-orange-500 text-white py-2 rounded-lg w-full hover:bg-orange-600 transition"
//                         >
//                             Send
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


























