import type { IAuthResponse } from "./auth.js";
import type { ILoginData, IRegisterUser } from "./user.js";

export interface IAuthService {
  login(loginData: ILoginData): Promise<IAuthResponse>;
  register(registerData: IRegisterUser): Promise<IAuthResponse>;
}
