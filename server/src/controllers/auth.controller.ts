import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '@app/utils/catchAsync';
import { AuthService } from '@app/services/auth.service';
import { IRegisterData } from '@app/types/auth.types';
// import { AppError } from '../utils/appError';         // Custom application error class



export class AuthController {

    constructor(private authService: AuthService){}

    /**
    * Controller function for user registration.
    * Handles the POST /auth/register request.
    */
    public register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
        const { username, password } = req.body;

        const userData: IRegisterData = {
            username,
            password,
        }

        const { user, token } = await this.authService.registerUser(userData);
    
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully!',
            user: {
                id: user.id,
            },
            token,  
        });
    });

    /**
     * Method for user login.
     * Handles the POST /auth/login request.
     */
    public login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const { username, password } = req.body;
        const loginData = {
            username: username,
            password: password
        }

        const { user, token } = await this.authService.loginUser(loginData);

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully!',
            user: {
                id: user.id,
            },
            token,  
        });
    });

}
