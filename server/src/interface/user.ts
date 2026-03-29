import { Document, Types } from "mongoose";

export interface IUserCredentials {
  username: string;
  password: string;
}

export type ILoginData = IUserCredentials;

export interface IRegisterUser extends IUserCredentials {}

export interface IUser extends IUserCredentials {}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
