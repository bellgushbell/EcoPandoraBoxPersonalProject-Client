import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useDonationStore = create(
    persist(
        (set) => ({
            campaignId: null,
            totalPrice: 0,

            setCampaignId: (id) => set({ campaignId: id }),
            setTotalPrice: (amount) => set({ totalPrice: amount }),

            resetDonation: () => set({ campaignId: null, totalPrice: 0 }), // รีเซ็ตค่า
        }),
        {
            name: "donationState",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useDonationStore;
