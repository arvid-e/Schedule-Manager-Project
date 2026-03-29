import { BCRYPT_SALT_ROUNDS } from "@app/config/constants";
import type { IAuthResponse } from "@app/interface/auth";
import type { IAuthService } from "@app/interface/auth-service";
import { IJwtProvider } from "@app/interface/jwt-provider";
import type { ILoginData, IRegisterUser } from "@app/interface/user";
import { IUserRepository } from "@app/interface/user-repository";
import bcrypt from "bcryptjs";


export class AuthService implements IAuthService {
  constructor(
    private userRepository: IUserRepository,
    private jwtProvider: IJwtProvider,
  ) {}

  async login(loginData: ILoginData): Promise<IAuthResponse> {
    const { username, password } = loginData;

    if (!username || !password) {
      throw new Error("Username or password missing.");
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

    const accessToken = this.jwtProvider.sign(
      { id: userId },
      { expiresIn: "15m" },
    );
    const refreshToken = this.jwtProvider.sign(
      { id: userId },
      { expiresIn: "7d" },
    );

    return {
      user,
      token: {
        accessToken,
        refreshToken,
      },
    };
  }

  async register(registerData: IRegisterUser): Promise<IAuthResponse> {
    const { username, password } = registerData;

    if (!username || !password) {
      throw new Error("Invalid username or password.");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await this.userRepository.create({
      username,
      password: hashedPassword,
    });
    const userId = user._id.toString();

    const accessToken = this.jwtProvider.sign(
      { id: userId },
      { expiresIn: "15m" },
    );
    const refreshToken = this.jwtProvider.sign(
      { id: userId },
      { expiresIn: "7d" },
    );

    return {
      user,
      token: {
        accessToken,
        refreshToken,
      },
    };
  }
}
