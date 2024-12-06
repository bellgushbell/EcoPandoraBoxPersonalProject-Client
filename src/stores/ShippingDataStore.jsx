import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useShippingStore = create(
    persist(
        (set) => ({
            shippingData: null,
            setShippingData: (data) => set({ shippingData: data }),
        }),
        {
            name: "ShippingDataStore",
        }
    )
);

export default useShippingStore;
