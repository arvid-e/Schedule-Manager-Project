/**
 * Custom error class for handling operational errors in the application.
 * Operational errors are expected errors that we can handle gracefully (e.g., invalid input, resource not found).
 * This distinguishes them from programming errors (e.g., bugs, undefined variables) which are unexpected.
 */
class AppError extends Error {
    statusCode: number;
    status: 'success' | 'fail' | 'error';
    isOperational: boolean; // Flag to distinguish operational errors from programming errors

    /**
     * Creates an instance of AppError.
     * 
     * @param message The error message to send to the client.
     * @param statusCode The HTTP status code associated with the error.
     */
    constructor(message: string, statusCode: number) {
        // Call the parent Error class constructor with the error message
        super(message);

        // Assign the HTTP status code
        this.statusCode = statusCode;

        // Determine the 'status' string based on the status code
        // 'fail' for 4xx errors (client-side errors), 'error' for 5xx errors (server-side errors)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Mark this as an operational error. This helps in the global error handler
        // to decide whether to send detailed error messages to the client (for operational errors)
        // or a generic message (for unexpected programming errors in production).
        this.isOperational = true;

        // Capture the stack trace. This is important for custom error classes
        // to ensure the stack trace points to where the error was thrown, not where AppError was constructed.
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;