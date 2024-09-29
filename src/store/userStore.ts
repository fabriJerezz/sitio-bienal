import { create } from "zustand";
import { UserAuthentication, UserReturnedData, UserStore } from "@/types";
import userService from "@/services/userService";

export const useUserStore = create<UserStore>((set) => ({
    //state
    user: null as UserReturnedData | null,
    //actions
    login: async (user: UserAuthentication) => {
        try {
            const userReturnedData : UserReturnedData = await userService.authenticateUser(user);
            set({ user: userReturnedData });
        } catch (error) {
            console.error("Failed to authenticate user:", error);
            // Optionally, you can handle the error state here
        }
    },
    logout: () => set({ user: null }),
}));    