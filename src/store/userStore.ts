import { create } from 'zustand';
import { UserAuthentication, UserReturnedData, UserStore } from '@/types';
import userService from '@/services/userService';

const useUserStore = create<UserStore>((set) => ({
    //state
    user: null as UserReturnedData | null,
    //actions
    login: async (user: UserAuthentication) => {
        try {
            const userReturnedData: UserReturnedData =
                await userService.authenticateUser(user);
            set({ user: userReturnedData });
        } catch (error) {
            console.error('Failed to authenticate user:', error);
            throw error;
        }
    },
    logout: () => set({ user: null }),
}));

export default useUserStore;
