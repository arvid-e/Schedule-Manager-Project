import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.js";
import Token from "../models/token-model.js";
import User from "../models/user-model.js";
import { TokenRepository } from "../repositories/token-repository.js";
import { UserRespository } from "../repositories/user-repository.js";
import { AuthService } from "../services/auth-service.js";
import { jwtProvider } from "../services/jwt-provider.js";
import { TokenService } from "../services/token-service.js";

export const router = Router();

const tokenRepo = new TokenRepository(Token);
const userRepo = new UserRespository(User);

const tokenService = new TokenService(jwtProvider, tokenRepo);
const authService = new AuthService(userRepo, tokenService);

const controller = new AuthController(authService);

router.post("/register", controller.register);
router.post("/login", controller.login);

// router.post('/refresh-token', refreshAuthToken);

export default router;
