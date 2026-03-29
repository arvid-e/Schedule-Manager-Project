import { ITokenService } from "@app/interface/auth.types";

export class TokenService implements ITokenService {
  constructor(private jwtProvider: IJwtProvider) {}
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
