import { beforeEach, describe, it, expect, vi, Mock } from 'vitest';
import bcrypt from 'bcryptjs'; 
import { AuthRespository, ConflictError, DatabaseError } from '@app/repositories/auth.repository';
import { ILoginData, IRegisterData, ITokenService, IUser, ICreateUserData } from '@app/types/auth.types';
import { AuthService } from './auth.service';
import { JWT_EXPIRES_IN } from '@app/config/constants';

// --- Mock the constants module ---
// This prevents the constants.ts file from throwing an error about missing env vars
// when it's imported by AuthService.

vi.mock('@app/config/constants', () => ({
    BCRYPT_SALT_ROUNDS: 8,
    JWT_SECRET: 'mock_jwt_secret',
    JWT_EXPIRES_IN: '1h',
}));

const MOCK_BCRYPT_SALT_ROUNDS = 8;

// --- Mock Dependencies ---

// Mock AuthRespository
const mockAuthRepository: {
    findUser: Mock;
    createUser: Mock;
} = {
    findUser: vi.fn(),
    createUser: vi.fn(),
};

// Mock ITokenService
const mockTokenService: {
    generateJwtToken: Mock;
} = {
    generateJwtToken: vi.fn(),
};

// --- CORRECTED bcryptjs mocking ---
// Directly return an object with vi.fn() for hash and compare.
// This ensures they are always mocks and avoids issues with importOriginal.
vi.mock('bcryptjs', () => ({
    default: { // <--- This is the key change: provide a 'default' export
        hash: vi.fn(),
        compare: vi.fn(),
    },
}));

// Cast the imported bcrypt to Mocked so we can access its mock methods
const mockedBcrypt = bcrypt as unknown as { hash: Mock; compare: Mock; };

// --- Test Subject Instance ---
let authService: AuthService;

describe('AuthService', () => {
    // beforeEach hook to reset mocks and re-instantiate AuthService for each test
    beforeEach(() => {
        vi.clearAllMocks(); // Clears call history and resets mock implementations to their initial state

        // Re-instantiate AuthService with fresh mocks
        authService = new AuthService(mockAuthRepository as unknown as AuthRespository, mockTokenService as unknown as ITokenService);
    });

    // --- Test Suite for loginUser method ---
    describe('loginUser', () => {
        const mockLoginData: ILoginData = {
            username: 'testuser',
            password: 'plainpassword',
        };

        const mockUserFound: IUser & { password?: string } = { // Add password for the mock user from DB
            _id: 'user123',
            username: 'testuser',
            password: 'hashedpasswordfromdb', // This is what findUser would return
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const mockGeneratedToken = 'mockJwtToken123';

        it('should successfully log in a user with correct credentials', async () => {
            // Configure mocks for a successful login flow
            mockAuthRepository.findUser.mockResolvedValue(mockUserFound);
            mockedBcrypt.compare.mockResolvedValue(true); // Password matches
            mockTokenService.generateJwtToken.mockReturnValue(mockGeneratedToken);

            const result = await authService.loginUser(mockLoginData);

            // Assertions
            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findUser).toHaveBeenCalledWith(mockLoginData.username);

            expect(mockedBcrypt.compare).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.compare).toHaveBeenCalledWith(mockLoginData.password, mockUserFound.password);

            expect(mockTokenService.generateJwtToken).toHaveBeenCalledTimes(1);
            expect(mockTokenService.generateJwtToken).toHaveBeenCalledWith({ userId: mockUserFound._id });

            expect(result).toEqual({
                user: { id: mockUserFound._id },
                token: mockGeneratedToken,
            });
        });

        it('should throw an error if user is not found', async () => {
            mockAuthRepository.findUser.mockResolvedValue(null); // User not found

            await expect(authService.loginUser(mockLoginData)).rejects.toThrow('User not found.');

            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findUser).toHaveBeenCalledWith(mockLoginData.username);
            // Ensure bcrypt and token service are not called
            expect(mockedBcrypt.compare).not.toHaveBeenCalled();
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });

        it('should throw an error if password is incorrect', async () => {
            mockAuthRepository.findUser.mockResolvedValue(mockUserFound);
            mockedBcrypt.compare.mockResolvedValue(false); // Password does not match

            await expect(authService.loginUser(mockLoginData)).rejects.toThrow('Incorrect password.');

            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.compare).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.compare).toHaveBeenCalledWith(mockLoginData.password, mockUserFound.password);
            // Ensure token service is not called
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });

        it('should re-throw DatabaseError from authRepository.findUser', async () => {
            const repoError = new DatabaseError('DB connection failed');
            mockAuthRepository.findUser.mockRejectedValue(repoError);

            await expect(authService.loginUser(mockLoginData)).rejects.toThrow('An unexpected database error occurred during login. Please try again later.');
            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.compare).not.toHaveBeenCalled();
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });

        it('should re-throw generic error if bcrypt.compare fails', async () => {
            mockAuthRepository.findUser.mockResolvedValue(mockUserFound);
            const bcryptError = new Error('Bcrypt internal error');
            mockedBcrypt.compare.mockRejectedValue(bcryptError);

            await expect(authService.loginUser(mockLoginData)).rejects.toThrow('An unknown authentication error occurred.');
            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.compare).toHaveBeenCalledTimes(1);
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });
    });

    // --- Test Suite for registerUser method ---
    describe('registerUser', () => {
        const mockRegisterData: IRegisterData = {
            username: 'newuser',
            password: 'newsecurepassword',
        };

        const mockUserFound: IUser & { password?: string } = {
            _id: 'user123',
            username: 'testuser',
            password: 'hashedpasswordfromdb',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const mockHashedPassword = 'mockhashedpassword';
        const mockCreatedUser: IUser = {
            _id: 'newUserId456',
            username: 'newuser',
            password: 'hashedpasswordfromdb',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const mockGeneratedToken = 'mockNewUserJwtToken';

        it('should successfully register a new user', async () => {
            // Configure mocks for a successful registration flow
            mockAuthRepository.findUser.mockResolvedValue(null); // Username not taken
            mockedBcrypt.hash.mockResolvedValue(mockHashedPassword);
            mockAuthRepository.createUser.mockResolvedValue(mockCreatedUser);
            mockTokenService.generateJwtToken.mockReturnValue(mockGeneratedToken);

            const result = await authService.registerUser(mockRegisterData);

            // Assertions
            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findUser).toHaveBeenCalledWith(mockRegisterData.username);

            expect(mockedBcrypt.hash).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.hash).toHaveBeenCalledWith(mockRegisterData.password, MOCK_BCRYPT_SALT_ROUNDS); // Use the mock constant

            expect(mockAuthRepository.createUser).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.createUser).toHaveBeenCalledWith({
                username: mockRegisterData.username,
                password: mockHashedPassword,
            } as ICreateUserData); // Cast to ICreateUserData for the mock call

            expect(mockTokenService.generateJwtToken).toHaveBeenCalledTimes(1);
            expect(mockTokenService.generateJwtToken).toHaveBeenCalledWith({ userId: mockCreatedUser._id });

            expect(result).toEqual({
                user: { id: mockCreatedUser._id },
                token: mockGeneratedToken,
            });
        });

        it('should throw an error if username is already taken', async () => {
            mockAuthRepository.findUser.mockResolvedValue(mockUserFound); // Username already exists

            await expect(authService.registerUser(mockRegisterData)).rejects.toThrow('Username is already taken.');

            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findUser).toHaveBeenCalledWith(mockRegisterData.username);
            // Ensure other services are not called
            expect(mockedBcrypt.hash).not.toHaveBeenCalled();
            expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });

        it('should throw ConflictError if createUser fails due to conflict', async () => {
            mockAuthRepository.findUser.mockResolvedValue(null);
            mockedBcrypt.hash.mockResolvedValue(mockHashedPassword);
            const conflictError = new ConflictError('User already exists in DB');
            mockAuthRepository.createUser.mockRejectedValue(conflictError);

            await expect(authService.registerUser(mockRegisterData)).rejects.toThrow('Registration failed: User already exists in DB');

            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.hash).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.createUser).toHaveBeenCalledTimes(1);
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });

        it('should throw DatabaseError if createUser fails due to database issue', async () => {
            mockAuthRepository.findUser.mockResolvedValue(null);
            mockedBcrypt.hash.mockResolvedValue(mockHashedPassword);
            const dbError = new DatabaseError('DB connection lost');
            mockAuthRepository.createUser.mockRejectedValue(dbError);

            await expect(authService.registerUser(mockRegisterData)).rejects.toThrow('Could not register user due to a database issue.');

            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.hash).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.createUser).toHaveBeenCalledTimes(1);
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });

        it('should re-throw generic error if bcrypt.hash fails', async () => {
            mockAuthRepository.findUser.mockResolvedValue(null);
            const bcryptError = new Error('Bcrypt hashing error');
            mockedBcrypt.hash.mockRejectedValue(bcryptError);

            await expect(authService.registerUser(mockRegisterData)).rejects.toThrow('Failed to register user due to an unknown error.');

            expect(mockAuthRepository.findUser).toHaveBeenCalledTimes(1);
            expect(mockedBcrypt.hash).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
            expect(mockTokenService.generateJwtToken).not.toHaveBeenCalled();
        });
    });
});

