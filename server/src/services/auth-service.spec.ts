import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { describe, it } from "vitest";
import { ITokenService } from "../interfaces/token-service.js";
import { IUserRepository } from "../interfaces/user-repository.js";
import { IUserService } from "../interfaces/user-service.js";
import { IUserCredentials, IUserDocument } from "../interfaces/user.js";
import { UserService } from "./user-service.js";

const TEST_USERNAME = "testuser";
const TEST_PASSWORD = "testpassword123";
const ACCESS_TOKEN = "access123";
const REFRESH_TOKEN = "refresh123";

vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}));

describe("userService", () => {
  let mockUserRepo: IUserRepository;
  let mockTokenService: ITokenService;
  let userService: IUserService;

  const createMockUser = (username: string, password: string) =>
    ({
      _id: new Types.ObjectId(),
      username,
      password,
    }) as IUserDocument;

  const createMockTokenResponse = () => ({
    accessToken: ACCESS_TOKEN,
    refreshToken: REFRESH_TOKEN,
  });

  const credentials: IUserCredentials = {
    username: TEST_USERNAME,
    password: TEST_PASSWORD,
  };

  beforeEach(() => {
    mockUserRepo = {
      findById: vi.fn(),
      findByUsername: vi.fn(),
      create: vi.fn(),
    } as unknown as IUserRepository;

    mockTokenService = {
      generateAccessPair: vi.fn(),
    } as unknown as ITokenService;

    userService = new UserService(mockUserRepo, mockTokenService);
  });

  describe("login()", () => {
    it("should return the user and token on successfull login", async () => {
      const mockUser = createMockUser(TEST_USERNAME, TEST_PASSWORD);
      const mockTokenResponse = createMockTokenResponse();

      vi.mocked(mockUserRepo.findByUsername).mockResolvedValue(mockUser);
      vi.mocked(mockTokenService.generateAccessPair).mockResolvedValue(
        mockTokenResponse,
      );
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await userService.login(credentials);

      expect(result.tokens.accessToken).toBe(ACCESS_TOKEN);
      expect(result.tokens.refreshToken).toBe(REFRESH_TOKEN);
      expect(result.user.username).toBe(TEST_USERNAME);
    });

    it("should throw error on invalid credentials", async () => {
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(userService.login(credentials)).rejects.toThrow(
        "Invalid username or password.",
      );
    });

    it("should throw error on when user not found", async () => {
      vi.mocked(mockUserRepo.findByUsername).mockResolvedValue(null);

      await expect(userService.login(credentials)).rejects.toThrow(
        "Invalid username or password.",
      );
    });
  });

  describe("register()", () => {
    it("should return the user and token on successfull register", async () => {
      const mockUser = createMockUser(TEST_USERNAME, TEST_PASSWORD);
      const mockTokenResponse = createMockTokenResponse();

      vi.mocked(mockUserRepo.create).mockResolvedValue(mockUser);
      vi.mocked(mockTokenService.generateAccessPair).mockResolvedValue(
        mockTokenResponse,
      );

      const result = await userService.register(credentials);

      expect(result.tokens.accessToken).toBe(ACCESS_TOKEN);
      expect(result.tokens.refreshToken).toBe(REFRESH_TOKEN);
      expect(result.user.username).toBe(TEST_USERNAME);
    });

    it("should return error on too short username", async () => {
      const invalidCredentials = {
        username: "a",
        password: TEST_PASSWORD,
      };

      await expect(userService.register(invalidCredentials)).rejects.toThrow(
        "Username is too short.",
      );
    });

    it("should return error on too short password", async () => {
      const invalidCredentials = {
        username: TEST_USERNAME,
        password: "123",
      };

      await expect(userService.register(invalidCredentials)).rejects.toThrow(
        "Password is too short",
      );
    });

    it("should return error if username is taken", async () => {
      const mockUser = createMockUser(TEST_USERNAME, TEST_PASSWORD);
      vi.mocked(mockUserRepo.findByUsername).mockResolvedValue(mockUser);

      await expect(userService.register(credentials)).rejects.toThrow(
        "Username is taken.",
      );
    });
  });
});
