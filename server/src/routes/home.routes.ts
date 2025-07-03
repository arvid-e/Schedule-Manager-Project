
import { Router } from 'express'; 
import { HomeController } from '../controllers/home.controller';

export const router = Router();

const controller = new HomeController();


router.get('/', controller.home);

// router.post('/refresh-token', refreshAuthToken);

export default router;