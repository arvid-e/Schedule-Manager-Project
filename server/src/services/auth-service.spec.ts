import { IAuthService } from "@app/interface/auth-service";
import { ITokenService } from "@app/interface/token-service";
import { IUserCredentials, IUserDocument } from "@app/interface/user";
import { IUserRepository } from "@app/interface/user-repository";
import bcrypt from 'bcryptjs';
import { Types } from "mongoose";
import { describe, it } from "vitest";
import { AuthService } from "./auth-service";

const TEST_USERNAME = 'testuser';
const TEST_PASSWORD = 'testpassword123';
const ACCESS_TOKEN = 'access123';
const REFRESH_TOKEN = 'refresh123';

vi.mock('bcryptjs', () => ({
    default: {
        compare: vi.fn(),
        hash: vi.fn(),
    },
}));

describe('authService', () => {
    let mockUserRepo: IUserRepository;
    let mockTokenService: ITokenService;
    let authService: IAuthService;

    const createMockUser = () => ({
        _id: new Types.ObjectId(),
        username: TEST_USERNAME,
        password: TEST_PASSWORD
    } as IUserDocument);

    const createMockTokenResponse = () => ({
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN
    });

    const credentials: IUserCredentials = {
        username: TEST_USERNAME,
        password: TEST_PASSWORD
    }

    beforeEach(() => {
        mockUserRepo = {
            findById: vi.fn(),
            findByUsername: vi.fn(),
            create: vi.fn()
        } as unknown as IUserRepository;

        mockTokenService = {
            generateAccessPair: vi.fn(),
        } as unknown as ITokenService;

        authService = new AuthService(mockUserRepo, mockTokenService);
    });

    describe('login()', () => {
        it('should return the user and token on successfull login', async () => {
            const mockUser = createMockUser();
            const mockTokenResponse = createMockTokenResponse();

            vi.mocked(mockUserRepo.findByUsername).mockResolvedValue(mockUser)
            vi.mocked(mockTokenService.generateAccessPair).mockResolvedValue(mockTokenResponse)
            vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

            const result = await authService.login(credentials)

            expect(result.tokens.accessToken).toBe(ACCESS_TOKEN);
            expect(result.tokens.refreshToken).toBe(REFRESH_TOKEN);
            expect(result.user.username).toBe(TEST_USERNAME)
        })

        it('should throw error on invalid credentials', async () => {
            const mockUser = createMockUser();
            const mockTokenResponse = createMockTokenResponse();

            vi.mocked(mockUserRepo.findByUsername).mockResolvedValue(mockUser)
            vi.mocked(mockTokenService.generateAccessPair).mockResolvedValue(mockTokenResponse)
            vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

            await expect(authService.login(credentials))
                .rejects
                .toThrow('Invalid username or password.');
        })

        it('should throw error on when user not found', async () => {
            vi.mocked(mockUserRepo.findByUsername).mockResolvedValue(null)

            await expect(authService.login(credentials))
                .rejects
                .toThrow('Invalid username or password.');
        })
    })

    describe('register()', () => {
        it('should return the user and token on successfull register', async () => {
            const mockUser = createMockUser();
            const mockTokenResponse = createMockTokenResponse();

            vi.mocked(mockUserRepo.create).mockResolvedValue(mockUser)
            vi.mocked(mockTokenService.generateAccessPair).mockResolvedValue(mockTokenResponse)

            const result = await authService.register(credentials)

            expect(result.tokens.accessToken).toBe(ACCESS_TOKEN);
            expect(result.tokens.refreshToken).toBe(REFRESH_TOKEN);
            expect(result.user.username).toBe(TEST_USERNAME)
        })
    })
})