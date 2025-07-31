import { Router } from 'express'; 
import { AuthController } from '@app/controllers/auth.controller';
import { AuthService } from '@app/services/auth.service';
import { AuthRespository } from '@app/repositories/auth.repository';
import { TokenService } from '@app/services/token.service';
import User from '@app/models/user.model';

export const router = Router();
const tokenService = new TokenService();
const authRepository = new AuthRespository(User);
const authService = new AuthService(authRepository, tokenService);
const controller = new AuthController(authService);

router.post('/register', controller.register);

router.post('/login', controller.login);

// router.post('/refresh-token', refreshAuthToken);

export default router;
