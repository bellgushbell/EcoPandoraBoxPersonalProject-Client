import { useState, useEffect, useRef } from "react";
import useSocketStore from "../../stores/socket-store";
import useUserStore from "../../stores/user-store";

export default function ChatAdmin() {
    const socket = useSocketStore((state) => state.socket);
    const chatRoom = useSocketStore((state) => state.chatRoom);
    const addMessage = useSocketStore((state) => state.addMessage);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null);
    const AdMinInformation = useUserStore((state) => state.user);

    useEffect(() => {
        if (chatBoxRef.current && chatRoom?.messages?.length > 0) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatRoom?.messages]);

    useEffect(() => {
        if (socket && chatRoom) {
            const handleNewMessage = (msg) => {
                if (msg.data.chatboxId === chatRoom.id) {
                    addMessage(msg.data);
                }
            };

            const handleMessagesRead = ({ chatBoxId }) => {
                if (chatBoxId === chatRoom.id) {
                    chatRoom.messages = chatRoom.messages.map((message) => ({
                        ...message,
                        isRead: true,
                    }));
                }
            };

            socket.on("message", handleNewMessage);
            socket.on("messagesRead", handleMessagesRead);

            return () => {
                socket.off("message", handleNewMessage);
                socket.off("messagesRead", handleMessagesRead);
            };
        }
    }, [socket, chatRoom, addMessage]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (socket && input.trim()) {
            socket.emit("message", input.trim());
            setInput("");
        }
    };

    if (!chatRoom) {
        return <p className="text-gray-500 text-center">Please select a chat room to view messages.</p>;
    }

    return (
        <div className="bg-white p-8 shadow-lg flex flex-col justify-between w-3/4 h-[700px] rounded-md">
            <div className="flex-1 overflow-y-auto space-y-4 p-4" ref={chatBoxRef}>
                {chatRoom?.messages?.length > 0 ? (
                    chatRoom.messages.map((message, index) => (
                        <div key={index} className={`flex gap-4 ${message.isAdmin ? "flex-row-reverse" : ""}`}>
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
                                <p className={`font-semibold ${message.isAdmin ? "text-end text-blue-600" : "text-start text-gray-700"}`}>
                                    {message.isAdmin ? "Support" : chatRoom?.user?.email || "Guest"}
                                </p>
                                <p className={`p-3 rounded-lg shadow-sm ${message.isAdmin ? "bg-gray-200 text-end" : "bg-blue-100 text-start"}`}>
                                    {message.message}
                                </p>
                                <div className="flex text-xs text-gray-500 ">
                                    <span className="text-xs text-gray-500 mr-2">
                                        {new Date(message.createdAt).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </span>
                                    {message.isRead ? (
                                        <span className="text-green-500">✓ Read</span>
                                    ) : (
                                        <span className="text-gray-400">✓ Sent</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No messages yet.</p>
                )}
            </div>
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

// export default function ChatAdmin() {
//     const socket = useSocketStore((state) => state.socket);
//     const chatRoom = useSocketStore((state) => state.chatRoom);
//     const addMessage = useSocketStore((state) => state.addMessage);
//     const [input, setInput] = useState("");
//     const chatBoxRef = useRef(null);
//     const AdMinInformation = useUserStore((state) => state.user);

//     useEffect(() => {
//         if (chatBoxRef.current && chatRoom?.messages?.length > 0) {
//             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//         }
//     }, [chatRoom?.messages]);

//     useEffect(() => {
//         if (socket && chatRoom) {
//             const handleNewMessage = (msg) => {
//                 if (msg.data.chatboxId === chatRoom.id) {
//                     addMessage(msg.data);
//                 }
//             };

//             const handleMessagesRead = ({ chatBoxId }) => {
//                 if (chatBoxId === chatRoom.id) {
//                     chatRoom.messages = chatRoom.messages.map((message) => ({
//                         ...message,
//                         isRead: true,
//                     }));
//                 }
//             };

//             socket.on("message", handleNewMessage);
//             socket.on("messagesRead", handleMessagesRead);

//             return () => {
//                 socket.off("message", handleNewMessage);
//                 socket.off("messagesRead", handleMessagesRead);
//             };
//         }
//     }, [socket, chatRoom, addMessage]);

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (socket && input.trim()) {
//             socket.emit("message", input.trim());
//             setInput("");
//         }
//     };

//     if (!chatRoom) {
//         return <p className="text-gray-500 text-center">Please select a chat room to view messages.</p>;
//     }

//     return (
//         <div className="bg-white p-8 shadow-lg flex flex-col justify-between w-3/4 h-[700px] rounded-md">
//             <div className="flex-1 overflow-y-auto space-y-4 p-4" ref={chatBoxRef}>
//                 {chatRoom?.messages?.length > 0 ? (
//                     chatRoom.messages.map((message, index) => (
//                         <div key={index} className={`flex gap-4 ${message.isAdmin ? "flex-row-reverse" : ""}`}>
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
//                                 <p className={`font-semibold ${message.isAdmin ? "text-end text-blue-600" : "text-start text-gray-700"}`}>
//                                     {message.isAdmin ? "Support" : chatRoom?.user?.email || "Guest"}
//                                 </p>
//                                 <p className={`p-3 rounded-lg shadow-sm ${message.isAdmin ? "bg-gray-200 text-end" : "bg-blue-100 text-start"}`}>
//                                     {message.message}
//                                 </p>
//                                 <div className="flex text-xs text-gray-500 ">
//                                     <span className="text-xs text-gray-500 mr-2">
//                                         {new Date(message.createdAt).toLocaleTimeString("en-US", {
//                                             hour: "2-digit",
//                                             minute: "2-digit",
//                                             hour12: true,
//                                         })}
//                                     </span>
//                                     {message.isRead ? (
//                                         <span className="text-green-500">✓ Read</span>
//                                     ) : (
//                                         <span className="text-gray-400">✓ Sent</span>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500 text-center">No messages yet.</p>
//                 )}
//             </div>
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





