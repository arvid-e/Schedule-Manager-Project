import type { TokenResponse } from "./auth.js";

export interface TokenService {
  generateAccessPair(userId: string): Promise<TokenResponse>;
}
