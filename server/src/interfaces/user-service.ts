import type { IAuthResponse } from "./auth.js";
import type { ILoginData, IRegisterUser } from "./user.js";

export interface IUserService {
  login(loginData: ILoginData): Promise<IAuthResponse>;
  register(registerData: IRegisterUser): Promise<IAuthResponse>;
  delete(id: string): Promise<boolean>;
}
