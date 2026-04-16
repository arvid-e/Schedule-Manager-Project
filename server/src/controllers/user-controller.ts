import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { UserRequestWithId } from '../interfaces/requests.js';
import { IUserService } from '../interfaces/user-service.js';
import { catchAsync } from '../utils/catch-async.js';

export class UserController {
  constructor(private userService: IUserService) {}

  register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;

      const { user, tokens } = await this.userService.register({
        username,
        password,
      });

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully!',
        _id: user._id,
        username,
        tokens,
      });
    },
  );

  login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;

      const { user, tokens } = await this.userService.login({
        username,
        password,
      });

      res.status(200).json({
        status: 'success',
        message: 'Logged in successfully!',
        _id: user._id,
        username,
        tokens,
      });
    },
  );

  delete = catchAsync(async (req: UserRequestWithId, res: Response) => {
    const { id } = req.params;
    const idString = id.toString();

    if (id == null || !isValidObjectId(id)) {
      throw new Error('Invalid ID');
    }

    if (req.user?.id != id) {
      throw new Error('User not found.');
    }

    const deleted = await this.userService.delete(idString);

    if (!deleted) {
      throw new Error('User could not be deleted.');
    }

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully!',
    });
  });
}
