import type { IRegisterUser, IUser, IUserDocument } from "@app/interface/user";
import type { IUserRepository } from "@app/interface/user-repository";
import { Model } from "mongoose";

export class UserRespository implements IUserRepository {
  constructor(private userModel: Model<IUserDocument>) {}

  async findById(id: string): Promise<IUser | null> {
    const user = this.userModel.findById(id);
    return await user.select("+password");
  }

  async create(userData: IRegisterUser): Promise<IUser> {
    return await this.userModel.create(userData);
  }
}
