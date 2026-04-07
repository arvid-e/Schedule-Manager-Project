import { SignOptions } from "jsonwebtoken";
import { IAuthPayload, IDecodedToken } from "./auth.js";

export interface IJwtProvider {
  sign(payload: IAuthPayload, options?: SignOptions): string;
  verify(token: string): IDecodedToken;
}
