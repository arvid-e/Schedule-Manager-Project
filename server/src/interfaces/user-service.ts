import type { AuthResponse } from "./auth.js";
import type { LoginData, RegisterUser } from "./user.js";

export interface UserService {
  login(loginData: LoginData): Promise<AuthResponse>;
  register(registerData: RegisterUser): Promise<AuthResponse>;
  delete(id: string): Promise<boolean>;
}
