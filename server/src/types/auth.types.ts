export interface IUser extends Document {
    _id: string,
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface JwtPayload {
    userId: string,
    roles?: string[]
}

export interface ICreateUserData {
    username: string,
    password: string
}

export interface IRegisterData {
    username: string;
    password: string;
}

export interface ILoginData {
    username: string;
    password: string;
}

export interface IAuthResponse {
    user: {
        id: string
    }
    token: string;
}

export interface IAuthRepository {
    findUserById(username: string): Promise<IUser | null>;
    createUser(userData: ICreateUserData): Promise<IUser>;
}

export interface IAuthService {
    loginUser(loginData: ILoginData): Promise<IAuthResponse>;
    registerUser(registerData: IRegisterData): Promise<IAuthResponse>;
}

export interface ITokenService {
    generateJwtToken(payload: JwtPayload): string;
    verifyJwtToken(token: string): any; 
}