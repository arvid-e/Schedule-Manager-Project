import { Request, Response, NextFunction } from 'express';
import { AuthError, UserNotFoundError, InvalidCredentialsError, UsernameTakenError, BadRequestError } from '../services/auth.service'; // Assuming these are defined in auth.service.ts or a dedicated errors file
import { ConflictError, DatabaseError } from '../repositories/auth.repository';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'An unexpected error occurred.';

    // Log the error stack for debugging (important for 500 errors)
    console.error('API Error Caught:', err.name, err.message, err.stack);

    // Auth Service Errors
    if (err instanceof UserNotFoundError) {
        statusCode = 401; 
        message = err.message;
    } else if (err instanceof InvalidCredentialsError) {
        statusCode = 401; 
        message = err.message;
    } else if (err instanceof UsernameTakenError) {
        statusCode = 409; 
        message = err.message;
    } else if (err instanceof BadRequestError) {
        statusCode = 400;
        message = err.message;
    } else if (err instanceof AuthError) {
        statusCode = 400; // Bad Request or 500 if truly unexpected
        message = err.message;
    }
    // Repository Errors
    else if (err instanceof ConflictError) {
        statusCode = 409; 
        message = err.message;
    } else if (err instanceof DatabaseError) {
        statusCode = 500;
        message = 'A database error occurred. Please try again later.';
    }
    // Mongoose Validation Errors (if not caught earlier by repository)
    else if (err.name === 'ValidationError') { 
        statusCode = 400;
        message = err.message; 
    }
    // Token Errors
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token.';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired.';
    }

    // For any other unhandled errors, default to 500
    // In production, avoid sending detailed error messages for 500 errors.
    if (statusCode === 500 && process.env.NODE_ENV === 'production') {
        message = 'Something went wrong!';
    }


    res.status(statusCode).json({
        status: 'error',
        message: message,
        // Optionally, include stack trace in development for debugging
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};