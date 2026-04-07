import type { ITokenResponse } from "./auth.js";

export interface ITokenService {
  generateAccessPair(userId: string): Promise<ITokenResponse>;
}
