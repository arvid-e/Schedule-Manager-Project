import type { IRegisterUser, IUserDocument } from "./user.js";

export interface IUserRepository {
  findById(id: string): Promise<IUserDocument | null>;
  findByUsername(username: string): Promise<IUserDocument | null>;
  create(userData: IRegisterUser): Promise<IUserDocument>;
  delete(id: string): Promise<boolean>;
}
