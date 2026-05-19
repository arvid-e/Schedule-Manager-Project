import { JwtProvider } from "../interfaces/jwt-provider.js";
import { TokenRepository } from "../interfaces/token-repository.js";
import { TokenService } from "../interfaces/token-service.js";

export class TokenServiceImpl implements TokenService {
  constructor(
    private jwtProvider: JwtProvider,
    private tokenRepo: TokenRepository,
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
