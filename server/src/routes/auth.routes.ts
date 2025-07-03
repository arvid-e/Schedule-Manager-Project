
import { Router } from 'express'; 

// import { register, login } from '../controllers/auth.controller';
// import { validateRegister, validateLogin } from '../middleware/validation.middleware';

export const router = Router();

// Full path: /api/auth/register (because it's mounted under '/auth' in routes/index.ts, and '/api' in app.ts)
// router.post('/register', validateRegister, register);

// POST /login
// This route handles user login.
// - `validateLogin`: A middleware to validate the login credentials format.
// - `login`: The controller function that authenticates the user.
// Full path: /api/auth/login
// router.post('/login', validateLogin, login);

// router.post('/refresh-token', refreshAuthToken);

export default router;
