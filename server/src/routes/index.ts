import { Router } from 'express'; // Import Router from Express

import authRoutes from './auth.routes';
import homeRouter from './home.routes';


// Create an instance of the Express Router
const router = Router();

router.use('/auth', authRoutes);
router.use('/', homeRouter);

export default router;