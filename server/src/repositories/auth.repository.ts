import mongoose, { Model }  from 'mongoose';
import { IAuthRepository, ICreateUserData, IUser, IUserDocument } from "@app/types/auth.types";

export class DatabaseError extends Error {};
export class ConflictError extends DatabaseError {};
export class NotFoundError extends DatabaseError {};

export class AuthRespository implements IAuthRepository {

    constructor(private userModel: Model<IUserDocument>) {}

    async findUser(username: string): Promise<IUser | null> {
        const queryResult = this.userModel.findOne({ username });
        return await queryResult.select('+password');
    }

    async createUser(userData: ICreateUserData): Promise<IUser> {
        try {
            const newUserDoc = await this.userModel.create(userData);
            return newUserDoc.toObject();

        }
        catch (error: any) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
                throw new ConflictError('User with this username already exists.');
            }
            if (error.name === 'ValidationError' || error instanceof mongoose.Error.ValidationError) {
                throw new DatabaseError(`Validation failed: ${error.message}`);
            }
            throw new DatabaseError(`Failed to create user: ${error.message || error}`);
        }
    }
}