import { IJwtProvider } from "../interfaces/jwt-provider.js";
import { ITokenRepository } from "../interfaces/token-repository.js";
import { ITokenService } from "../interfaces/token-service.js";

export class TokenService implements ITokenService {
  constructor(
    private jwtProvider: IJwtProvider,
    private tokenRepo: ITokenRepository,
  ) {}
  async generateAccessPair(userId: string) {
    const accessToken = this.jwtProvider.sign(
      { id: userId },
      { expiresIn: "15m" },
    );

    const refreshToken = this.jwtProvider.sign(
      { id: userId },
      { expiresIn: "7d" },
    );

    await this.tokenRepo.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }
}
