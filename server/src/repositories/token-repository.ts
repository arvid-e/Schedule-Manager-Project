import { TokenRepository } from "../interfaces/token-repository.js";
import { TokenDocument } from "../interfaces/token.js";
import Token from "../models/token-model.js";


export class TokenRepositoryImpl implements TokenRepository {
  constructor(private tokenModel: typeof Token) {}

  saveRefreshToken = async (
    userId: string,
    refreshToken: string,
  ): Promise<TokenDocument> => {
    return await this.tokenModel.create({ userId, refreshToken });
  };
}
