import type { ITokenResponse } from "./auth";

export interface ITokenService {
  generateAccessPair(userId: string): Promise<ITokenResponse>;
}
