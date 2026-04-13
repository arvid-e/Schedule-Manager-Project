import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../config/constants.js";
import { IAuthResponse } from "../interfaces/auth.js";
import { ITokenService } from "../interfaces/token-service.js";
import { IUserRepository } from "../interfaces/user-repository.js";
import { IUserService } from "../interfaces/user-service.js";
import { ILoginData, IRegisterUser } from "../interfaces/user.js";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
  ) {}

  async login(loginData: ILoginData): Promise<IAuthResponse> {
    const { username, password } = loginData;

    if (!username || !password) {
      throw new Error("Username or password missing.");
    }

    if (username.length < 3) {
      throw new Error("Username is too short.");
    }

    if (password.length < 8) {
      throw new Error("Password is too short.");
    }

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error("Invalid username or password.");
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      throw new Error("Invalid username or password.");
    }

    const userId = user._id.toString();
    const tokens = await this.tokenService.generateAccessPair(userId);

    return {
      user,
      tokens,
    };
  }

  async register(registerData: IRegisterUser): Promise<IAuthResponse> {
    const { username, password } = registerData;

    if (!username || !password) {
      throw new Error("Invalid username or password.");
    }

    if (username.length < 3) {
      throw new Error("Username is too short.");
    }

    if (password.length < 8) {
      throw new Error("Password is too short.");
    }

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser != null) {
      throw new Error("Username is taken.");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await this.userRepository.create({
      username,
      password: hashedPassword,
    });
    const userId = user._id.toString();
    const tokens = await this.tokenService.generateAccessPair(userId);

    return {
      user,
      tokens,
    };
  }

  delete(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
