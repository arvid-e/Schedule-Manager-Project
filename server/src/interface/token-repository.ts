export interface ITokenRepository {
  saveRefreshToken(userId: string, refreshToken: string): Promise<boolean>;
}
