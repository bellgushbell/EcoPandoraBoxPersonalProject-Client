import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API = import.meta.env.VITE_API;

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: '',

            login: async (body) => {
                const result = await axios.post(`${API}/auth/login`, body);
                if (result.data && result.data.token) {
                    set({ user: result.data.user, token: result.data.token });
                }
            },
            logout: () => {
                set({ token: '', user: null });
                window.location.reload();
            },
            register: async (body) => {
                await axios.post(`${API}/auth/register`, body);
            },
            // current user
            getMe: async () => {
                const { token } = useUserStore.getState();
                if (!token) throw new Error('please Login');
                const result = await axios.get(`${API}/auth/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return result.data;
            },
        }),
        {
            name: "stateUserData",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;
