import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync'; // Utility to gracefully handle async errors
// import { AppError } from '../utils/appError';         // Custom application error class



export class HomeController {

    public home = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        res.send('Home')
        //res.sendFile('../../public/index.html')
    });

    public app = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        res.send('Protected app')
    });
}

const homeController = new HomeController();
export default homeController;