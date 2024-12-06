import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useReceivedItemStore = create(
    persist(
        (set) => ({
            receivedItemId: null,
            setReceivedItemId: (id) => set({ receivedItemId: id }), // ฟังก์ชันสำหรับตั้งค่า receivedItemId
        }),
        {
            name: "ReceivedItemStore",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useReceivedItemStore;
