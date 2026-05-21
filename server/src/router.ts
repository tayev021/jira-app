import { Router } from 'express';
import { authRouter } from './modules/auth/auth.router';
import { userRouter } from './modules/user/user.router';
import { notFoundHandler } from './shared/middleware/notFoundHandler';
import { workspaceRouter } from './modules/workspace/workspace.router';
import { issueRouter } from './modules/issue/issue.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/issues', issueRouter);

router.use(notFoundHandler);

export { router };
