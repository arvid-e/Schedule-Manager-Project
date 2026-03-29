import { IAuthPayload, IDecodedToken } from "@app/interface/auth";
import { IJwtProvider } from "@app/interface/jwt-provider";
import jwt, { SignOptions } from "jsonwebtoken";

export class JwtProvider implements IJwtProvider {
  private readonly secret = process.env.JWT_SECRET!;

  sign(payload: IAuthPayload, options?: SignOptions): string {
    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string): IDecodedToken {
    return jwt.verify(token, this.secret) as IDecodedToken;
  }
}

export const jwtProvider = new JwtProvider();
