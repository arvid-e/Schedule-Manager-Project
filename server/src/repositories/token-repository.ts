import { ITokenRepository } from "../interfaces/token-repository.js";
import { ITokenDocument } from "../interfaces/token.js";
import Token from "../models/token-model.js";


export class TokenRepository implements ITokenRepository {
  constructor(private tokenModel: typeof Token) {}

  saveRefreshToken = async (
    userId: string,
    refreshToken: string,
  ): Promise<ITokenDocument> => {
    return await this.tokenModel.create({ userId, refreshToken });
  };
}
