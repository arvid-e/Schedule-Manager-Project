import { BCRYPT_SALT_ROUNDS } from "@app/config/constants";
import { AuthRespository, ConflictError, DatabaseError } from "@app/repositories/auth.repository";
import { IAuthResponse, IAuthService, ILoginData, IRegisterData, ITokenService } from "@app/types/auth.types";
import bcrypt from 'bcryptjs';

class AuthError extends Error {}
class UserNotFoundError extends AuthError {}
class InvalidCredentialsError extends AuthError {}
class UsernameTakenError extends AuthError {}

export class AuthService implements IAuthService {
    constructor(private authRepository: AuthRespository, private tokenService: ITokenService) {}

    async loginUser(loginData: ILoginData): Promise<IAuthResponse> {

        try {
            const { username, password } = loginData;

            const user = await this.authRepository.findUser(username);

            if (!user) {
                throw new UserNotFoundError('User not found.');
            }
            const userId = user._id;
            const hashedPassword = user.password;

             if (hashedPassword === undefined) {
                throw new Error('User data missing password hash.');
            }

            const correctPassword = await bcrypt.compare(password, hashedPassword);

            if (!correctPassword) {
                throw new InvalidCredentialsError('Incorrect password.');
            }

            const payload = {
                userId: userId,

            }
            const token = this.tokenService.generateJwtToken(payload);
        
            return {
                user: {
                    id: userId,
                },
                token: token
            }
        }

        catch (error) {
            // Re-throw custom errors thrown within this method directly
            if (error instanceof UserNotFoundError || error instanceof InvalidCredentialsError) {
                throw error;
            }
            // Handle errors propagated from the repository (AuthRepository's custom errors)
            if (error instanceof ConflictError) { 
                console.error('Unexpected ConflictError during login:', error.message);
                throw new AuthError(`Login failed due to conflict: ${error.message}`);
            }
            if (error instanceof DatabaseError) {
                console.error('Database operation failed during login:', error.message);
                throw new AuthError('An unexpected database error occurred during login. Please try again later.');
            }
            // Catch any other unexpected errors (e.g., from bcrypt itself if it rejects with a generic Error)
            console.error('An unexpected error occurred in AuthService.loginUser:', error);
            throw new AuthError('An unknown authentication error occurred.');
        }

    }

    async registerUser(registerData: IRegisterData): Promise<IAuthResponse> {

        try {
            const { username, password } = registerData;

            const userNameTaken = await this.authRepository.findUser(username);

            if (userNameTaken) {
                throw new UsernameTakenError('Username is already taken.');
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

            const newUser = {
                username: username,
                password: hashedPassword
            }

            const user = await this.authRepository.createUser(newUser);
            const userId = user._id;

            const payload = {
                userId: userId
            }

            const token = this.tokenService.generateJwtToken(payload);

            return {
                user: {
                    id: userId,
                },
                token: token
            }
        } 
        
        catch (error) {
            if (error instanceof UsernameTakenError) {
                throw error;
            }
            // Handle errors propagated from the repository
            if (error instanceof ConflictError) {
                // Re-throw as ConflictError or wrap in AuthError, depending on desired abstraction.
                throw new AuthError(`Registration failed: ${error.message}`);
            }
            if (error instanceof DatabaseError) {
                console.error('Database error during registration:', error.message);
                throw new AuthError('Could not register user due to a database issue.');
            }
            // Catch any other unexpected errors (e.g., from bcrypt itself if it rejects with a generic Error)
            console.error('Unexpected error during registration:', error);
            throw new AuthError('Failed to register user due to an unknown error.');
        }
    }
    
}

