import { Router } from 'express'; // Import Router from Express

import authRoutes from './auth.routes';
import eventRouter from './event.routes';
import homeRouter from './home.routes';

const router = Router();


router.use('/', homeRouter);

router.use('/auth', authRoutes);

router.use('/event', eventRouter)

export default router;