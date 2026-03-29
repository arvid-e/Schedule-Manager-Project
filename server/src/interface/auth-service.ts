import type { IAuthResponse } from "./auth";
import type { ILoginData, IRegisterUser } from "./user";

export interface IAuthService {
  loginUser(loginData: ILoginData): Promise<IAuthResponse>;
  registerUser(registerData: IRegisterUser): Promise<IAuthResponse>;
}
