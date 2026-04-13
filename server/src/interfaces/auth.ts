import type { JwtPayload } from "jsonwebtoken";
import type { IUserDocument } from "./user.js";

export interface ILoginData {
  username: string;
  password: string;
}

export interface IAuthResponse {
  user: IUserDocument;
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
