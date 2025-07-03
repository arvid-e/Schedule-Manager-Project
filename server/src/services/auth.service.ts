import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import ms, { StringValue } from 'ms';

import { BCRYPT_SALT_ROUNDS, JWT_EXPIRES_IN, JWT_SECRET } from '../config/constants';
import User from '../models/user.model';
import { IAuthResponse, ILoginData, IRegisterData } from "../types/auth.types";

class AuthService {

    /**
     * Private helper method to generate a JSON Web Token (JWT).
     * @param userId - The ID of the user for whom to generate the token.
     * @returns The generated JWT string.
     * @throws AppError if JWT configuration is missing.
     */
    private generateJwtToken(userId: string): string {
        if (!JWT_SECRET || !JWT_EXPIRES_IN) {
            // In a production app, you might log this error more verbosely
            throw new Error('Server configuration error: JWT secret or expiry not set.');
        }

         const payload = { id: userId };
         const expiresInSeconds = ms(JWT_EXPIRES_IN as StringValue) / 1000;

         const options: SignOptions = {
             expiresIn: expiresInSeconds,
         };
        
        return jwt.sign(
            payload,
            JWT_SECRET as Secret,
            options
        );
    }


    /**
     * Registers a new user with a hashed password and generates an authentication token.
     * 
     * @param data - An object containing the user's name, email, and password.
     * @returns A Promise that resolves to an object containing the new user's public data and their JWT.
     * @throws AppError if a user with the given email already exists.
     */
    public async registerUser(data: IRegisterData): Promise<IAuthResponse> {
        const { name, password } = data;

        const existingUser = await User.findOne({ name });
        if (existingUser) {
            throw new Error('User with that name already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        const newUser = await User.create({ name, password: hashedPassword });

        const token = this.generateJwtToken(newUser._id.toString());

        return {
            user: {
                _id: newUser._id,
                name: newUser.name,
            },
            token,
        };
    }

    public async loginUser (data: ILoginData): Promise<IAuthResponse> {
        const { name, password } = data;

        const existingUser = await User.findOne({ name }).select('+password'); 

        if (!existingUser) {
            throw new Error('Invalid credentials');        }
    
        const authenticated = await bcrypt.compare(password, existingUser.password);

        if (!authenticated) {
            throw new Error('Invalid credentials');        }

        const token = this.generateJwtToken(existingUser._id.toString());

        return {
            user: {
                _id: existingUser._id,
                name: existingUser.name,
            },
            token,
        };
    } 
}

export default new AuthService();
