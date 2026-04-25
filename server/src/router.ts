import { Router } from 'express';
import { authRouter } from './modules/auth/auth.router';
import { notFoundHandler } from './shared/middleware/notFoundHandler';
import { workspaceRouter } from './modules/workspace/workspace.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/workspaces', workspaceRouter);

router.use(notFoundHandler);

export { router };
