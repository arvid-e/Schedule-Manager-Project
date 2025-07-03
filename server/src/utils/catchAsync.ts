import { Request, Response, NextFunction, RequestHandler } from 'express';

// Define a type for your asynchronous handler functions (e.g., your controller functions)
// They are functions that take req, res, next and return a Promise.
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * A higher-order function to wrap asynchronous Express route handlers.
 * It catches any errors (rejected Promises) from the async function
 * and passes them to Express's next() middleware, ensuring they are
 * caught by the global error handler.
 *
 * @param fn The asynchronous Express route handler function (your controller function).
 * @returns An Express RequestHandler that ensures errors are passed to 'next()'.
 */
export const catchAsync = (fn: AsyncHandler): RequestHandler => {
  // This returned function is the actual Express middleware/handler
  // that will be called when a request matches the route.
  return (req: Request, res: Response, next: NextFunction) => {
    // We execute the original async function (fn).
    // Since 'fn' is an async function, it will always return a Promise.
    // We then attach a .catch() handler to that Promise.
    // If the Promise rejects (i.e., an error occurs in 'fn'),
    // the .catch() block will execute, passing the error to 'next()'.
    // 'next()' then forwards the error to your global error handling middleware.
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// A more concise way to write the same function using arrow function syntax:
// export const catchAsync = (fn: AsyncHandler): RequestHandler => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };