import { AuthRespository, ConflictError, DatabaseError } from "@app/repositories/auth.repository";
import { IAuthResponse, IAuthService, ILoginData, IRegisterData, ITokenService } from "@app/types/auth.types";
import bcrypt from 'bcryptjs';


export class AuthService implements IAuthService {
    constructor(private authRepository: AuthRespository, private tokenService: ITokenService) {}

    async loginUser(loginData: ILoginData): Promise<IAuthResponse> {

        try {
            const { username, password } = loginData;

            const user = await this.authRepository.findUserById(username);

            if (!user) {
                throw Error('Incorrect password or username!')
            }
            const userId = user._id;
            const hashedPassword = user.password;
            const correctPassword = await bcrypt.compare(password, hashedPassword);

            if (!correctPassword) {
                throw Error('Incorrect password or username!')
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
            if (error instanceof Error && error.message === 'Invalid credentials.') {
                throw error; // Re-throw so the controller can handle it (e.g., return 401)
            }

            // Handle errors propagated from the repository
            if (error instanceof ConflictError) {
                throw new Error(`Registration conflict: ${error.message}`);
            }
            if (error instanceof DatabaseError) {
                console.error('Database operation failed during login:', error.message);
                throw new Error('An unexpected error occurred during login. Please try again later.');
            }
            console.error('An unexpected error occurred in AuthService.loginUser:', error);
            throw new Error('An unknown error occurred.'); 
        }

    }

    async registerUser(registerData: IRegisterData): Promise<IAuthResponse> {

        try {
            const user = await this.authRepository.createUser(registerData);
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
            if (error instanceof ConflictError) {
                throw new Error(`Registration failed: ${error.message}`);
            }
            if (error instanceof DatabaseError) {
                console.error('Database error during registration:', error.message);
                throw new Error('Could not register user due to a database issue.');
            }
            console.error('Unexpected error during registration:', error);
            throw new Error('Failed to register user.');
        }
    }
    
}

