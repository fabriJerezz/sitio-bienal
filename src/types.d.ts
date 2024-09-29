

export declare interface UserAuthentication {
    username: string;
    password: string;
}

export declare interface UserReturnedData {
    username: string;
    token: string;
    role: string;
    country: string;
}

export declare interface UserRegistration {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: string;
    country: string;
}

declare interface UserStore {
    user: UserReturnedData | null;
    login: (user: UserAuthentication) => Promise<void>;
    logout: () => void;
}

