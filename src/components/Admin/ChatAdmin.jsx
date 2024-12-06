import { useState, useEffect, useRef } from "react";
import useSocketStore from "../../stores/socket-store";
import useUserStore from "../../stores/user-store";

/**
 * ChatAdmin: แสดงข้อความในห้องที่เลือก และส่งข้อความได้
 */
export default function ChatAdmin() {
    const socket = useSocketStore((state) => state.socket);
    const chatRoom = useSocketStore((state) => state.chatRoom);
    const addMessage = useSocketStore((state) => state.addMessage);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null);
    const AdMinInformation = useUserStore(state => state.user)
    // console.log('AdMinInformation', AdMinInformation)
    // เลื่อน Scroll ไปยังข้อความล่าสุด
    useEffect(() => {
        if (chatBoxRef.current && chatRoom?.messages?.length > 0) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatRoom?.messages]);

    // รับข้อความใหม่จาก Socket.IO //กรณีแอดมินตอบกลับ
    useEffect(() => {
        if (socket) {
            const handleNewMessage = (msg) => {
                console.log(msg)
                if (msg.data.chatboxId === chatRoom?.id) { // ตรวจสอบว่าข้อความอยู่ในห้องที่เลือก
                    addMessage(msg.data);
                }
            };
            socket.on("message", handleNewMessage);

            return () => {
                socket.off("message", handleNewMessage);
            };
        }
    }, [socket, chatRoom, addMessage]);

    // ส่ง Event "read" เมื่อเปิดห้องแชท
    useEffect(() => {
        if (socket && chatRoom) {
            socket.emit("read", { chatBoxId: chatRoom.id });
        }
    }, [socket, chatRoom]);

    // ส่งข้อความไปยังห้องแชท
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (socket && input.trim()) {
            // ตรวจสอบว่า message ถูกส่งเป็น String
            socket.emit("message", input.trim());
            setInput(""); // ล้างข้อความหลังส่ง
        }
    };


    // หากยังไม่ได้เลือกห้องแชท
    if (!chatRoom) {
        return <p className="text-gray-500 text-center">Please select a chat room to view messages.</p>;
    }

    return (
        <div className="bg-white p-8 shadow-lg flex flex-col justify-between w-3/4 h-[700px] rounded-md">
            {/* แสดงข้อความ */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4" ref={chatBoxRef}>
                {chatRoom?.messages?.length > 0 ? (
                    chatRoom.messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex gap-4 ${message.isAdmin ? "flex-row-reverse" : ""}`}
                        >
                            {/* รูปผู้ส่งข้อความ */}
                            <img
                                src={
                                    message.isAdmin
                                        ? AdMinInformation?.profileImage || "/assets/adminsupportpic.png"
                                        : chatRoom?.user?.profileImage || "/assets/guestpic.png"
                                }
                                alt="User Avatar"
                                className="h-12 w-12 rounded-full border border-gray-300"
                            />
                            <div>
                                {/* ชื่อผู้ส่ง */}
                                <p
                                    className={`font-semibold ${message.isAdmin ? "text-end text-blue-600" : "text-start text-gray-700"
                                        }`}
                                >
                                    {message.isAdmin ? "Support" : chatRoom?.user?.email || "Guest"}
                                </p>
                                {/* เนื้อหาข้อความ */}
                                <p
                                    className={`p-3 rounded-lg shadow-sm ${message.isAdmin ? "bg-gray-200 text-end" : "bg-blue-100 text-start"
                                        }`}
                                >
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No messages yet.</p>
                )}
            </div>

            {/* กล่องข้อความ */}
            <form className="flex gap-3 mt-4" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="bg-white p-3 border-4 rounded-full hover:bg-blue-600 transition shadow-lg">
                    <img src="/public/assets/adminsendicon.gif" alt="Send" className="w-6 h-6" />
                </button>
            </form>
        </div>
    );
}





// import { useState, useEffect, useRef } from "react";
// import useSocketStore from "../../stores/socket-store";
// import useUserStore from "../../stores/user-store";

// /**
//  * ChatAdmin: แสดงข้อความในห้องที่เลือก และส่งข้อความได้
//  */
// export default function ChatAdmin() {
//     const socket = useSocketStore((state) => state.socket);
//     const chatRoom = useSocketStore((state) => state.chatRoom);
//     const addMessage = useSocketStore((state) => state.addMessage);
//     const [input, setInput] = useState("");
//     const chatBoxRef = useRef(null);
//     const AdMinInformation = useUserStore(state => state.user)
//     // console.log('AdMinInformation', AdMinInformation)
//     // เลื่อน Scroll ไปยังข้อความล่าสุด
//     useEffect(() => {
//         if (chatBoxRef.current && chatRoom?.messages?.length > 0) {
//             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//         }
//     }, [chatRoom?.messages]);

//     // รับข้อความใหม่จาก Socket.IO //กรณีแอดมินตอบกลับ
//     useEffect(() => {
//         if (socket) {
//             const handleNewMessage = (msg) => {
//                 console.log(msg)
//                 if (msg.data.chatboxId === chatRoom?.id) { // ตรวจสอบว่าข้อความอยู่ในห้องที่เลือก
//                     addMessage(msg.data);
//                 }
//             };
//             socket.on("message", handleNewMessage);

//             return () => {
//                 socket.off("message", handleNewMessage);
//             };
//         }
//     }, [socket, chatRoom, addMessage]);

//     // ส่ง Event "read" เมื่อเปิดห้องแชท
//     useEffect(() => {
//         if (socket && chatRoom) {
//             socket.emit("read", { chatBoxId: chatRoom.id });
//         }
//     }, [socket, chatRoom]);

//     // ส่งข้อความไปยังห้องแชท
//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (socket && input.trim()) {
//             // ตรวจสอบว่า message ถูกส่งเป็น String
//             socket.emit("message", input.trim());
//             setInput(""); // ล้างข้อความหลังส่ง
//         }
//     };


//     // หากยังไม่ได้เลือกห้องแชท
//     if (!chatRoom) {
//         return <p className="text-gray-500 text-center">Please select a chat room to view messages.</p>;
//     }

//     return (
//         <div className="bg-white p-8 shadow-lg flex flex-col justify-between w-3/4 h-[700px] rounded-md">
//             {/* แสดงข้อความ */}
//             <div className="flex-1 overflow-y-auto space-y-4 p-4" ref={chatBoxRef}>
//                 {chatRoom?.messages?.length > 0 ? (
//                     chatRoom.messages.map((message, index) => (
//                         <div
//                             key={index}
//                             className={`flex gap-4 ${message.isAdmin ? "flex-row-reverse" : ""}`}
//                         >
//                             {/* รูปผู้ส่งข้อความ */}
//                             <img
//                                 src={
//                                     message.isAdmin
//                                         ? AdMinInformation?.profileImage || "/assets/adminsupportpic.png"
//                                         : chatRoom?.user?.profileImage || "/assets/guestpic.png"
//                                 }
//                                 alt="User Avatar"
//                                 className="h-12 w-12 rounded-full border border-gray-300"
//                             />
//                             <div>
//                                 {/* ชื่อผู้ส่ง */}
//                                 <p
//                                     className={`font-semibold ${message.isAdmin ? "text-end text-blue-600" : "text-start text-gray-700"
//                                         }`}
//                                 >
//                                     {message.isAdmin ? "Support" : chatRoom?.user?.email || "Guest"}
//                                 </p>
//                                 {/* เนื้อหาข้อความ */}
//                                 <p
//                                     className={`p-3 rounded-lg shadow-sm ${message.isAdmin ? "bg-gray-200 text-end" : "bg-blue-100 text-start"
//                                         }`}
//                                 >
//                                     {message.message}
//                                 </p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500 text-center">No messages yet.</p>
//                 )}
//             </div>

//             {/* กล่องข้อความ */}
//             <form className="flex gap-3 mt-4" onSubmit={handleSendMessage}>
//                 <input
//                     type="text"
//                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                     placeholder="Type a message..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                 />
//                 <button className="bg-white p-3 border-4 rounded-full hover:bg-blue-600 transition shadow-lg">
//                     <img src="/public/assets/adminsendicon.gif" alt="Send" className="w-6 h-6" />
//                 </button>
//             </form>
//         </div>
//     );
// }





