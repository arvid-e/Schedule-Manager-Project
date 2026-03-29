import type { IUser, IRegisterUser } from "./user";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  create(userData: IRegisterUser): Promise<IUser>;
}
