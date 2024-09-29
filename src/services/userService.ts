import { UserAuthentication, UserRegistration, UserReturnedData } from "@/types";
import keysToCamelCase from "@/utils/toCamelCase";
const userService = {
    authenticateUser: async (user: UserAuthentication) : Promise<UserReturnedData> => {
        try {
            const response = await fetch(`https://tp-final-bienal.onrender.com/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error("Failed to authenticate user");
            }
            const data = await response.json();
            return keysToCamelCase(data) as UserReturnedData;
        } catch (error) {
            console.error("Error during authentication:", error);
            throw error;
        }
    },
    registerUser: async (user: UserRegistration) : Promise<UserReturnedData> => {
        try {
            const response = await fetch(`https://tp-final-bienal.onrender.com/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error("Failed to register user");
            }
            const data = await response.json();
            return keysToCamelCase(data) as UserReturnedData;
        } catch (error) {
            console.error("Error during registration:", error);
            throw error;    
        }
    }
};

export default userService;
