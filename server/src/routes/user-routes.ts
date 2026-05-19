import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import Token from "../models/token-model.js";
import User from "../models/user-model.js";
import { TokenRepositoryImpl } from "../repositories/token-repository.js";
import { UserRespositoryImpl } from "../repositories/user-repository.js";
import { jwtProviderImpl } from "../services/jwt-provider.js";
import { TokenServiceImpl } from "../services/token-service.js";
import { UserServiceImpl } from "../services/user-service.js";
import { protect } from "../middleware/auth-middleware.js";

export const router = Router();

const tokenRepo = new TokenRepositoryImpl(Token);
const userRepo = new UserRespositoryImpl(User);

const tokenService = new TokenServiceImpl(jwtProviderImpl, tokenRepo);
const userService = new UserServiceImpl(userRepo, tokenService);

const controller = new UserController(userService);

router.delete("/:id", protect, controller.delete);

export default router;
