import { Router } from 'express';
import { authController } from './auth.controller';
import { protect } from '../../shared/middleware/protect';

const authRouter = Router();

authRouter.get('/me', protect, authController.me);
authRouter.post('/signup', authController.signUp);
authRouter.post('/signin', authController.signIn);
authRouter.post('/signout', authController.signOut);

export { authRouter };
