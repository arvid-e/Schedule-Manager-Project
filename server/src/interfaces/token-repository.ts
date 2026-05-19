import { TokenDocument } from "./token.js";

export interface TokenRepository {
  saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<TokenDocument>;
}
