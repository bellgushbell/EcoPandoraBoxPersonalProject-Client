import useSocketStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";

export default function SidebarChatAdmin({ chatBoxList }) {
    const { chatRoom, setChatBox } = useSocketStore(
        useShallow((state) => ({
            chatRoom: state.chatRoom,
            setChatBox: state.setChatBox,
        }))
    );
    const socket = useSocketStore((state) => state.socket);

    const handleChatClick = (id) => {
        if (chatRoom && chatRoom.id === id) return; // หากเลือกห้องเดิม ไม่ทำอะไร
        setChatBox(id); // เปลี่ยนห้องแชทที่เลือก

        // แจ้ง Backend ว่าแอดมินเปลี่ยนห้อง
        if (socket) {
            socket.emit("adminJoinChat", id);
        }
    };

    return (
        <div
            className="w-1/4 bg-white p-4 border-r border-gray-300 overflow-y-auto rounded-md shadow-md"
            style={{ maxHeight: "600px" }}
        >
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-4">Recent Chats</h2>
            <div className="flex flex-col gap-4 pb-8">
                {chatBoxList.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-4 p-3 cursor-pointer rounded-md overflow-hidden hover:bg-blue-50 transition ${chatRoom && item.id === chatRoom.id ? "bg-blue-100" : ""
                            }`}
                        onClick={() => handleChatClick(item.id)}
                    >
                        <img
                            src={item?.user?.profileImage || "/public/assets/guestpic.png"}
                            alt="User"
                            className="w-[50px] h-[50px] rounded-full border-2 border-gray-200"
                        />
                        <div>
                            <p className="font-bold text-gray-700">{item?.user?.email || "Guest"}</p>
                            <p className="text-gray-500 text-sm truncate">
                                {item?.messages?.[0]?.message || "No messages yet."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}













// import useSocketStore from "../../stores/socket-store";
// import { useShallow } from "zustand/shallow";

// export default function SidebarChatAdmin({ chatBoxList }) {
//     const { chatRoom, setChatBox } = useSocketStore(
//         useShallow((state) => ({
//             chatRoom: state.chatRoom,
//             setChatBox: state.setChatBox,
//         }))
//     );
//     const socket = useSocketStore((state) => state.socket);

//     const handleChatClick = (id) => {
//         if (chatRoom && chatRoom.id === id) return; // หากเลือกห้องเดิม ไม่ทำอะไร
//         setChatBox(id); // เปลี่ยนห้องแชทที่เลือก

//         // แจ้ง Backend ว่าแอดมินเปลี่ยนห้อง
//         if (socket) {
//             socket.emit("adminJoinChat", id);
//         }
//     };

//     return (
//         <div
//             className="w-1/4 bg-white p-4 border-r border-gray-300 overflow-y-auto rounded-md shadow-md"
//             style={{ maxHeight: "600px" }}
//         >
//             <h2 className="text-lg font-semibold border-b border-gray-300 mb-4">Recent Chats</h2>
//             <div className="flex flex-col gap-4 pb-8">
//                 {chatBoxList.map((item) => (
//                     <div
//                         key={item.id}
//                         className={`flex items-center gap-4 p-3 cursor-pointer rounded-md overflow-hidden hover:bg-blue-50 transition ${chatRoom && item.id === chatRoom.id ? "bg-blue-100" : ""
//                             }`}
//                         onClick={() => handleChatClick(item.id)}
//                     >
//                         <img
//                             src={item?.user?.profileImage || "/public/assets/guestpic.png"}
//                             alt="User"
//                             className="w-[50px] h-[50px] rounded-full border-2 border-gray-200"
//                         />
//                         <div>
//                             <p className="font-bold text-gray-700">{item?.user?.email || "Guest"}</p>
//                             <p className="text-gray-500 text-sm truncate">
//                                 {item?.messages?.[0]?.message || "No messages yet."}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }













