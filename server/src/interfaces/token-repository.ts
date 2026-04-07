import { ITokenDocument } from "./token.js";

export interface ITokenRepository {
  saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<ITokenDocument>;
}
