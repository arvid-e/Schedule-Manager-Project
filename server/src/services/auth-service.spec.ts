import { describe, it } from "vitest";
import { AuthService } from "./auth-service";
import { IUserRepository } from "@app/interface/user-repository";
import { ITokenService } from "@app/interface/token-service";

describe('', () => {

    const mockUserRepo = {
        findById: vi.fn(),
        findByUserName: vi.fn(),
        create: vi.fn()
    } as unknown as IUserRepository

    const mockTokenService = {
        generateAccessPair: vi.fn(),
    } as unknown as ITokenService

    const authService = new AuthService(mockUserRepo, mockTokenService)

    it('', () => {

    })
})