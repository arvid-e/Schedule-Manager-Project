import type { JwtPayload } from "jsonwebtoken";
import type { UserDocument } from "./user.js";

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: UserDocument;
  tokens: TokenResponse;
}

export interface AuthPayload {
  id: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken extends JwtPayload, AuthPayload {
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration (timestamp)
}
