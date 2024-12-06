import React, { useEffect, useState } from "react";
import AllChatAdmin from "../../components/Admin/AllChatAdmin";
import useSocketStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";

export default function DashboardAdmin() {
    const { socket, connect } = useSocketStore(
        useShallow((state) => ({
            socket: state.socket,
            connect: state.connect,
        }))
    );
    const [chatBoxList, setChatBoxList] = useState([]);
    const [chatOpen, setChatOpen] = useState(false);
    const [noti, setNoti] = useState(0);

    // เชื่อมต่อ Socket.IO
    useEffect(() => {
        connect();
    }, []);

    // รับ Event จาก Socket.IO
    useEffect(() => {
        if (socket) {
            socket.on("adminJoinComplete", (allLastMessage) => {
                setChatBoxList(allLastMessage);
            });

            socket.on("userMessage", (data) => {
                setChatBoxList((prevChatBoxList) => {
                    const newData = data.data;
                    const indx = prevChatBoxList.findIndex(
                        (item) => item.id === newData.chatboxId
                    );
                    let newArr = [...prevChatBoxList];
                    if (indx !== -1) {
                        newArr[indx].messages.push(newData);
                    } else {
                        newArr.push({ id: newData.chatboxId, messages: [newData] });
                    }
                    return newArr;
                });
            });

            socket.on("adminRead", ({ data }) => {
                setChatBoxList((prev) =>
                    prev.map((chatBox) =>
                        chatBox.id === data.chatboxId ? { ...chatBox, messages: data.messages } : chatBox
                    )
                );
            });

            socket.emit("adminJoin");
        }

        return () => {
            if (socket) {
                socket.off("adminJoinComplete");
                socket.off("userMessage");
                socket.off("adminRead");
            }
        };
    }, [socket]);

    // คำนวณจำนวนห้องที่มีข้อความยังไม่ได้อ่าน
    useEffect(() => {
        const calculateUnreadChats = () => {
            let unreadChats = 0;
            chatBoxList.forEach((chatBox) => {
                const hasUnreadMessage = chatBox.messages.some(
                    (msg) => msg.isRead === false
                );
                if (hasUnreadMessage) {
                    unreadChats++;
                }
            });
            return unreadChats;
        };

        const newNoti = calculateUnreadChats();
        if (noti !== newNoti) {
            setNoti(newNoti);
        }
    }, [chatBoxList, noti]);

    // อัปเดตสถานะการอ่านเมื่อเปิดแชท
    const handleOpenChat = (chatBoxId) => {
        setChatOpen(true);
        socket.emit("read", { chatBoxId }); // ส่ง Event `read` ไปยัง Backend
    };

    return (
        <>
            {chatOpen && (
                <AllChatAdmin setChatOpen={setChatOpen} chatBoxList={chatBoxList} />
            )}
            <div className="p-8 min-h-screen bg-white rounded-2xl">
                <div className="bg-gradient-to-r from-green-500 to-[#1E4D8C] p-6 rounded-lg shadow-2xl mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center">
                            <p className="text-xl font-bold text-white">TOTAL CHATS</p>
                            <p className="text-3xl font-bold text-white">
                                {chatBoxList.length}
                            </p>
                        </div>
                        <button
                            onClick={() => handleOpenChat()}
                            className="relative flex flex-col justify-center items-center rounded-lg p-8 border-4 border-green bg-[#198d34] text-[#fafafb] font-semibold shadow-lg hover:bg-[#ff9a2e] hover:border-[#FFD700] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            <p className="text-2xl font-bold">WAITING CHAT</p>
                            <p className="absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-[#f1eff0] rounded-full border-4 border-[#4829e5] bg-[#1f0a63] p-2">
                                {noti}
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}




// import React, { useEffect, useState } from "react";
// import AllChatAdmin from "../../components/Admin/AllChatAdmin";
// import useSocketStore from "../../stores/socket-store";
// import { useShallow } from "zustand/shallow";

// export default function DashboardAdmin() {
//     const { socket, connect } = useSocketStore(
//         useShallow((state) => ({
//             socket: state.socket,
//             connect: state.connect,
//         }))
//     );
//     const [chatBoxList, setChatBoxList] = useState([]);
//     const [chatOpen, setChatOpen] = useState(false);
//     const [noti, setNoti] = useState(0);

//     // เชื่อมต่อ Socket.IO
//     useEffect(() => {
//         connect();
//     }, []);

//     // รับ Event จาก Socket.IO
//     useEffect(() => {
//         if (socket) {
//             socket.on("adminJoinComplete", (allLastMessage) => {
//                 setChatBoxList(allLastMessage);
//             });

//             socket.on("userMessage", (data) => {
//                 setChatBoxList((prevChatBoxList) => {
//                     const newData = data.data;
//                     const indx = prevChatBoxList.findIndex(
//                         (item) => item.id === newData.chatboxId
//                     );
//                     let newArr = [...prevChatBoxList];
//                     if (indx !== -1) {
//                         newArr[indx].messages.push(newData);
//                     } else {
//                         newArr.push({ id: newData.chatboxId, messages: [newData] });
//                     }
//                     return newArr;
//                 });
//             });

//             socket.on("adminRead", ({ data }) => {
//                 setChatBoxList((prev) =>
//                     prev.map((chatBox) =>
//                         chatBox.id === data.chatboxId ? { ...chatBox, messages: data.messages } : chatBox
//                     )
//                 );
//             });

//             socket.emit("adminJoin");
//         }

//         return () => {
//             if (socket) {
//                 socket.off("adminJoinComplete");
//                 socket.off("userMessage");
//                 socket.off("adminRead");
//             }
//         };
//     }, [socket]);

//     // คำนวณจำนวนห้องที่มีข้อความยังไม่ได้อ่าน
//     useEffect(() => {
//         const calculateUnreadChats = () => {
//             let unreadChats = 0;
//             chatBoxList.forEach((chatBox) => {
//                 const hasUnreadMessage = chatBox.messages.some(
//                     (msg) => msg.isRead === false
//                 );
//                 if (hasUnreadMessage) {
//                     unreadChats++;
//                 }
//             });
//             return unreadChats;
//         };

//         const newNoti = calculateUnreadChats();
//         if (noti !== newNoti) {
//             setNoti(newNoti);
//         }
//     }, [chatBoxList, noti]);

//     // อัปเดตสถานะการอ่านเมื่อเปิดแชท
//     const handleOpenChat = (chatBoxId) => {
//         setChatOpen(true);
//         socket.emit("read", { chatBoxId }); // ส่ง Event `read` ไปยัง Backend
//     };

//     return (
//         <>
//             {chatOpen && (
//                 <AllChatAdmin setChatOpen={setChatOpen} chatBoxList={chatBoxList} />
//             )}
//             <div className="p-8 min-h-screen bg-white rounded-2xl">
//                 <div className="bg-gradient-to-r from-green-500 to-[#1E4D8C] p-6 rounded-lg shadow-2xl mb-6">
//                     <div className="flex justify-between items-center">
//                         <div className="flex flex-col items-center">
//                             <p className="text-xl font-bold text-white">TOTAL CHATS</p>
//                             <p className="text-3xl font-bold text-white">
//                                 {chatBoxList.length}
//                             </p>
//                         </div>
//                         <button
//                             onClick={() => handleOpenChat()}
//                             className="relative flex flex-col justify-center items-center rounded-lg p-8 border-4 border-green bg-[#198d34] text-[#fafafb] font-semibold shadow-lg hover:bg-[#ff9a2e] hover:border-[#FFD700] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
//                         >
//                             <p className="text-2xl font-bold">WAITING CHAT</p>
//                             <p className="absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-[#f1eff0] rounded-full border-4 border-[#4829e5] bg-[#1f0a63] p-2">
//                                 {noti}
//                             </p>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }




