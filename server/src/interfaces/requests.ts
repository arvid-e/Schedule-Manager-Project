import type { Request } from 'express';

export interface IdParam {
  id: string;
}

export interface IUserRequest extends Request {
  user?: {
    id: string;
  };
}

export type UserRequestWithId = IUserRequest & { params: IdParam };