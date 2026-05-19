import { TokenDocument } from "../interfaces/token.js";
import { Schema, model } from "mongoose";

const tokenSchema = new Schema<TokenDocument>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    refreshToken: {
      type: String,
      required: [true, "Token is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Token = model<TokenDocument>("Token", tokenSchema);
export default Token;
