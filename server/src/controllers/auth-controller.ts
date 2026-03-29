import { AuthService } from "@app/services/auth-service";
import { catchAsync } from "@app/utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;

      const { user, token } = await this.authService.register({ username, password });

      res.status(201).json({
        status: "success",
        message: "User registered successfully!",
        user,
        token,
      });
    },
  );

  login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;

      const { user, token } = await this.authService.login({ username, password });

      res.status(200).json({
        status: "success",
        message: "Logged in successfully!",
        user,
        token,
      });
    },
  );
}
