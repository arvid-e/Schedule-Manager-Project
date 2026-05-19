import type { RegisterUser, UserDocument } from "./user.js";

export interface UserRepository {
  findById(id: string): Promise<UserDocument | null>;
  findByUsername(username: string): Promise<UserDocument | null>;
  create(userData: RegisterUser): Promise<UserDocument>;
  delete(id: string): Promise<boolean>;
}
