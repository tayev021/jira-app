import { Router } from 'express';
import { protect } from '../../shared/middleware/protect';
import { authController } from './auth.controller';
import { validateBody } from '../../shared/middleware/validateBody';
import { authValidation } from './auth.validation';

const authRouter = Router();

authRouter.get('/me', protect, authController.me);
authRouter.get('/refresh', authController.refresh);
authRouter.post(
  '/signup',
  validateBody(authValidation.signUpSchema),
  authController.signUp
);
authRouter.post(
  '/signin',
  validateBody(authValidation.signInSchema),
  authController.signIn
);
authRouter.post('/signout', authController.signOut);

export { authRouter };
