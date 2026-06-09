import { Router } from 'express';
import { protect } from '../../shared/middleware/protect';
import { workspaceController } from './workspace.controller';
import { validateBody } from '../../shared/middleware/validateBody';
import { workspaceValidations } from './workspace.validation';

const workspaceRouter = Router();

workspaceRouter.get('/', protect, workspaceController.getWorkspaces);
workspaceRouter.get(
  '/:workspaceId/statistics',
  protect,
  workspaceController.getWorkspaceStatistics
);
workspaceRouter.get('/:workspaceId', protect, workspaceController.getWorkspace);
workspaceRouter.post(
  '/',
  protect,
  validateBody(workspaceValidations.createSchema),
  workspaceController.createWorkspace
);
workspaceRouter.patch(
  '/:workspaceId',
  protect,
  validateBody(workspaceValidations.updateNameSchema),
  workspaceController.updateWorkspaceName
);
workspaceRouter.put(
  '/:workspaceId/member',
  protect,
  validateBody(workspaceValidations.addMemberSchema),
  workspaceController.addMember
);
workspaceRouter.delete(
  '/:workspaceId',
  protect,
  workspaceController.deleteWorkspace
);
workspaceRouter.delete(
  '/:workspaceId/member',
  protect,
  validateBody(workspaceValidations.deleteMemberSchema),
  workspaceController.deleteMember
);

export { workspaceRouter };
