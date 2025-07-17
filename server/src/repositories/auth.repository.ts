import mongoose from 'mongoose';
import User from '@app/models/user.model';
import { IAuthRepository, ICreateUserData, IUser } from "@app/types/auth.types";

export class DatabaseError extends Error {};
export class ConflictError extends DatabaseError {};
export class NotFoundError extends DatabaseError {};

export class AuthRespository implements IAuthRepository { 

    async findUserById(username: string): Promise<IUser | null> {
        return await User.findOne({ username }).select('+password');
    }

    async createUser(userData: ICreateUserData): Promise<IUser> {
        try {
            return await User.create(userData);

        } 
        
        catch (error: any) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
                throw new ConflictError('User with this username already exists.');
            }
            if (error instanceof mongoose.Error.ValidationError) {
                throw new DatabaseError(`Validation failed: ${error.message}`);
            }
            throw new DatabaseError(`Failed to create user: ${error.message || error}`);
        }
    }
}