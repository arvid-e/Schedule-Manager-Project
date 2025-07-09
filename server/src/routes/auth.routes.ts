
import { Router } from 'express'; 
import { AuthController } from '@app/controllers/auth.controller';


export const router = Router();

const controller = new AuthController();


router.post('/register', controller.register);

router.post('/login', controller.login);

// router.post('/refresh-token', refreshAuthToken);

export default router;
