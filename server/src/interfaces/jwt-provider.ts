import { SignOptions } from "jsonwebtoken";
import { AuthPayload, DecodedToken } from "./auth.js";

export interface JwtProvider {
  sign(payload: AuthPayload, options?: SignOptions): string;
  verify(token: string): DecodedToken;
}
