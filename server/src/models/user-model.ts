import type { IUserDocument } from "@app/interface/user";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUserDocument>("User", userSchema);
export default User;
