import { UserDocument } from "../interfaces/user.js";
import { Schema, model } from "mongoose";

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
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

const User = model<UserDocument>("User", userSchema);
export default User;
