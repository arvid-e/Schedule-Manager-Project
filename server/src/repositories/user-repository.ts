
import { UserRepository } from "../interfaces/user-repository.js";
import { RegisterUser, UserDocument } from "../interfaces/user.js";
import { Model } from "mongoose";

export class UserRespository implements UserRepository {
  constructor(private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserDocument | null> {
    const user = this.userModel.findById(id);
    return await user.select("+password");
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    const user = this.userModel.findOne({ username });
    return await user.select("+password");
  }

  async create(userData: RegisterUser): Promise<UserDocument> {
    return await this.userModel.create(userData);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.userModel.deleteOne({ _id: id });
    return deleted.deletedCount > 0;
  }
}
