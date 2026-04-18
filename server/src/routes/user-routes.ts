import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import Token from "../models/token-model.js";
import User from "../models/user-model.js";
import { TokenRepository } from "../repositories/token-repository.js";
import { UserRespository } from "../repositories/user-repository.js";
import { jwtProvider } from "../services/jwt-provider.js";
import { TokenService } from "../services/token-service.js";
import { UserService } from "../services/user-service.js";
import { protect } from "../middleware/auth-middleware.js";

export const router = Router();

const tokenRepo = new TokenRepository(Token);
const userRepo = new UserRespository(User);

const tokenService = new TokenService(jwtProvider, tokenRepo);
const userService = new UserService(userRepo, tokenService);

const controller = new UserController(userService);

router.delete("/:id", protect, controller.delete);

export default router;
