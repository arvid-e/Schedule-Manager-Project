import { ITokenDocument } from "./token";

export interface ITokenRepository {
  saveRefreshToken(userId: string, refreshToken: string): Promise<ITokenDocument>;
}
