import { NextFunction, Response } from "express";
import { UserRequestWithId } from "../interfaces/requests.js";
import { jwtProviderImpl } from "../services/jwt-provider.js";

export const protect = (
  req: UserRequestWithId,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authorized, no token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwtProviderImpl.verify(token);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return next(new Error("Invalid or expired authorization token"));
  }
};
