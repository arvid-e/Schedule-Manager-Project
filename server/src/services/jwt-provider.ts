import { AuthPayload, DecodedToken } from "../interfaces/auth.js";
import { JwtProvider } from "../interfaces/jwt-provider.js";
import jwt, { SignOptions } from "jsonwebtoken";

export class JwtProviderImpl implements JwtProvider {
  private readonly secret = process.env.JWT_SECRET!;

  sign(payload: AuthPayload, options?: SignOptions): string {
    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string): DecodedToken {
    return jwt.verify(token, this.secret) as DecodedToken;
  }
}

export const jwtProvider = new JwtProviderImpl();
