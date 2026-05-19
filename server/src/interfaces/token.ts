import { Document } from "mongoose";

export interface Token {
  userId: string;
  refreshToken: string;
}

export interface TokenDocument extends Token, Document {}
