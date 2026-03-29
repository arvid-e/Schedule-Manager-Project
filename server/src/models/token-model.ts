import { ITokenDocument } from "@app/interface/token";
import { Schema, model } from "mongoose";

const tokenSchema = new Schema<ITokenDocument>(
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

const Token = model<ITokenDocument>("Token", tokenSchema);
export default Token;
