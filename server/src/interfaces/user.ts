import { Document, Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}

export type LoginData = UserCredentials;

export interface RegisterUser extends UserCredentials {}

export interface User extends UserCredentials {}

export interface UserDocument extends User, Document {
  _id: Types.ObjectId;
}
