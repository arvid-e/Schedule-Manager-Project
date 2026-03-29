import type { IAuthResponse } from "./auth";
import type { ILoginData, IRegisterUser } from "./user";

export interface IAuthService {
  login(loginData: ILoginData): Promise<IAuthResponse>;
  register(registerData: IRegisterUser): Promise<IAuthResponse>;
}
