
import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../interfaces/auth-service.js";
import { catchAsync } from "../utils/catchAsync.js";

export class AuthController {
  constructor(private authService: IAuthService) {}

  register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;

      const { tokens } = await this.authService.register({ username, password });

      res.status(201).json({
        status: "success",
        message: "User registered successfully!",
        username,
        tokens,
      });
    },
  );

  login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;

      const { tokens } = await this.authService.login({ username, password });

      res.status(200).json({
        status: "success",
        message: "Logged in successfully!",
        username,
        tokens,
      });
    },
  );
}
