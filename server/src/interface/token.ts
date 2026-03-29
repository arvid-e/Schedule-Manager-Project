import { Document } from "mongoose";

export interface IToken {
  userId: string;
  refreshToken: string;
}

export interface ITokenDocument extends IToken, Document {}
