import { create } from "zustand";
import useUserStore from "./user-store";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API;

const useSocketStore = create((set, get) => ({
    socket: null,
    chatRoom: null,
    chatList: [],
    connect: () => {
        const { token } = useUserStore.getState();
        if (token) {
            const socket = io(API, {
                extraHeaders: { Authorization: `Bearer ${token}` },
            });

            socket.on("adminJoinComplete", (chatList) => set({ chatList }));
            socket.on("userMessage", (data) => {
                const newChat = data.data;
                set((state) => ({
                    chatList: [
                        newChat,
                        ...state.chatList.filter((chat) => chat.id !== newChat.id),
                    ],
                }));
            });

            set({ socket });
        }
    },
    setChatBox: (id) => {
        const { socket } = get();
        if (socket) {
            // ส่งคำขอไปยัง Backend เพื่อเข้าร่วมห้องแชท
            socket.emit("adminJoinChat", id);

            // รอรับข้อมูลห้องแชทจาก Backend
            socket.once("joinComplete", (data) => {
                if (data?.room) {
                    set({ chatRoom: data.room }); // อัปเดตห้องแชทใน Zustand Store
                }
            });
        }
    },

    //แอดมินตอบกลับ
    addMessage: (newMessage) => {
        const { chatRoom } = get();
        if (chatRoom) {
            const updatedMessages = [...chatRoom.messages, newMessage];
            set({ chatRoom: { ...chatRoom, messages: updatedMessages } });
        }
    },
    disconnect: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null, chatRoom: null, chatList: [] });
        }
    },
}));

export default useSocketStore;










// import { create } from "zustand";
// import useUserStore from "./user-store";
// import { io } from "socket.io-client";

// const API = import.meta.env.VITE_API;

// const useSocketStore = create((set, get) => ({
//     socket: null,
//     chatRoom: null,
//     chatList: [],
//     connect: () => {
//         const { token } = useUserStore.getState();
//         if (token) {
//             const socket = io(API, {
//                 extraHeaders: { Authorization: `Bearer ${token}` },
//             });

//             socket.on("adminJoinComplete", (chatList) => set({ chatList }));
//             socket.on("userMessage", (data) => {
//                 const newChat = data.data;
//                 set((state) => ({
//                     chatList: [
//                         newChat,
//                         ...state.chatList.filter((chat) => chat.id !== newChat.id),
//                     ],
//                 }));
//             });

//             set({ socket });
//         }
//     },
//     setChatBox: (id) => {
//         const { socket } = get();
//         if (socket) {
//             // ส่งคำขอไปยัง Backend เพื่อเข้าร่วมห้องแชท
//             socket.emit("adminJoinChat", id);

//             // รอรับข้อมูลห้องแชทจาก Backend
//             socket.once("joinComplete", (data) => {
//                 if (data?.room) {
//                     set({ chatRoom: data.room }); // อัปเดตห้องแชทใน Zustand Store
//                 }
//             });
//         }
//     },

//     //แอดมินตอบกลับ
//     addMessage: (newMessage) => {
//         const { chatRoom } = get();
//         if (chatRoom) {
//             const updatedMessages = [...chatRoom.messages, newMessage];
//             set({ chatRoom: { ...chatRoom, messages: updatedMessages } });
//         }
//     },
//     disconnect: () => {
//         const { socket } = get();
//         if (socket) {
//             socket.disconnect();
//             set({ socket: null, chatRoom: null, chatList: [] });
//         }
//     },
// }));

// export default useSocketStore;










