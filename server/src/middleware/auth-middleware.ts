import type { UserRequestWithId } from "@app/interface/requests";
import { NextFunction, Response } from "express";
import { jwtProvider } from "@app/services/jwt-provider";

export const protect = (
  req: UserRequestWithId,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwtProvider.verify(token);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
