export interface JwtPayload {
  userId: string;
  roles?: string[];
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IAuthResponse {
  user: {
    id: string;
  };
  token: string;
}
