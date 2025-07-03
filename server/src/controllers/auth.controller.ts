import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service'; // <--- Check this line!
import { catchAsync } from '../utils/catchAsync'; // Utility to gracefully handle async errors
// import { AppError } from '../utils/appError';         // Custom application error class



export class AuthController {

    /**
    * Controller function for user registration.
    * Handles the POST /api/auth/register request.
    */
    public register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { name, password } = req.body;
        const userData = {
            name,
            password,
        }

        const { user, token } = await authService.registerUser(userData);
    
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully!',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                },
                token,
            },
        });
    });

    /**
     * Method for user login.
     * Handles the POST /api/auth/login request.
     */
    public login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { name, password } = req.body;

        if (!name || !password) {
            return next(new Error('Please provide email and password!'));
        }

        // Call the service layer (assuming service also expects an object now)
        const { user, token } = await authService.loginUser({ name, password });

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully!',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                },
                token,
            },
        });
    });

}

const authController = new AuthController();
export default authController;