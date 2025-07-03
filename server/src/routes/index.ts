import { Router } from 'express'; // Import Router from Express

import authRoutes from './auth.routes';

// Create an instance of the Express Router
const router = Router();

router.use('/auth', authRoutes);

export default router;