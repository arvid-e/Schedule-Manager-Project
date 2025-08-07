
import { Router } from 'express'; 
import { HomeController } from '@app/controllers/home.controller';
import protect from '@app/middleware/auth.middleware';

export const router = Router();

const controller = new HomeController();


router.get('/', controller.home);

router.get('/app', protect, controller.app)

// router.post('/refresh-token', refreshAuthToken);

export default router;