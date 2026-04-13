
import { IUserRepository } from "../interfaces/user-repository.js";
import { IRegisterUser, IUserDocument } from "../interfaces/user.js";
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

  async delete(id: string): Promise<boolean> {
    const deleted = await this.userModel.deleteOne({ _id: id });
    return deleted.deletedCount > 0;
  }
}
