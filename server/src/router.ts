import { Router } from 'express';
import { authRouter } from './modules/auth/auth.router';
import { notFoundHandler } from './shared/middleware/notFoundHandler';

const router = Router();

router.use('/auth', authRouter);

router.use(notFoundHandler);

export { router };
