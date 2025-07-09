import { IUser } from "./user.types";

export interface IRegisterData {
    name: string;
    password: string;
}

export interface ILoginData {
    name: string;
    password: string;
}

// Define the shape of the data returned by authentication service methods
// Partial<IUser> ensures we don't send back sensitive fields like the hashed password
export interface IAuthResponse {
    user: Partial<IUser>; // User data without sensitive info
    token: string;
}