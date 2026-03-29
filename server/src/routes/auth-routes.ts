import { AuthController } from "@app/controllers/auth-controller";
import Token from "@app/models/token-model";
import User from "@app/models/user-model";
import { TokenRepository } from "@app/repositories/token-repository";
import { UserRespository } from "@app/repositories/user-repository";
import { AuthService } from "@app/services/auth-service";
import { jwtProvider } from "@app/services/jwt-provider";
import { TokenService } from "@app/services/token-service";
import { Router } from "express";

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
