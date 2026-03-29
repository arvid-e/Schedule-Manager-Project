import type { IRegisterUser, IUser, IUserDocument } from "@app/interface/user";
import type { IUserRepository } from "@app/interface/user-repository";
import { Model } from "mongoose";

export class UserRespository implements IUserRepository {
  constructor(private userModel: Model<IUserDocument>) {}

  async findById(id: string): Promise<IUserDocument | null> {
    const user = this.userModel.findById(id);
    return await user.select("+password");
  }

  async findByUsername(username: string): Promise<IUserDocument | null> {
    const user = this.userModel.findOne({ username });
    return await user.select("+password");
  }

  async create(userData: IRegisterUser): Promise<IUserDocument> {
    return await this.userModel.create(userData);
  }
}
