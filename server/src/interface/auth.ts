import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "./user";

export interface ILoginData {
  username: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  tokens: ITokenResponse;
}

export interface IAuthPayload {
  id: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IDecodedToken extends JwtPayload, IAuthPayload {
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration (timestamp)
}


