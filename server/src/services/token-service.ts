import { IJwtProvider } from "@app/interface/jwt-provider";
import { ITokenRepository } from "@app/interface/token-repository";
import { ITokenService } from "@app/interface/token-service";

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
