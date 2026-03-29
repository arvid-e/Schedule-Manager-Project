import { Router } from 'express'; // Import Router from Express

import authRoutes from './auth-routes';
import taskRoutes from './task-routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes)

export default router;