import { SignOptions } from "jsonwebtoken";
import { IAuthPayload, IDecodedToken } from "./auth";

export interface IJwtProvider {
  sign(payload: IAuthPayload, options?: SignOptions): string;
  verify(token: string): IDecodedToken;
}
