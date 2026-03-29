import type { IRegisterUser, IUserDocument } from "./user";

export interface IUserRepository {
  findById(id: string): Promise<IUserDocument | null>;
  findByUsername(username: string): Promise<IUserDocument | null>;
  create(userData: IRegisterUser): Promise<IUserDocument>;
}
