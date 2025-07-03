
import { Router } from 'express'; 
import { HomeController } from '../controllers/home.controller';
import protect from '../middleware/authMiddleware';

export const router = Router();

const controller = new HomeController();


router.get('/', controller.home);

router.get('/app', protect, controller.app)

// router.post('/refresh-token', refreshAuthToken);

export default router;