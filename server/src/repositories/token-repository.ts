import { ITokenDocument } from "@app/interface/token";
import { ITokenRepository } from "@app/interface/token-repository";
import Token from "@app/models/token-model";

export class TokenRepository implements ITokenRepository {
  constructor(private tokenModel: typeof Token) {}

  saveRefreshToken = async (
    userId: string,
    refreshToken: string,
  ): Promise<ITokenDocument> => {
    return await this.tokenModel.create({ userId, refreshToken });
  };
}
