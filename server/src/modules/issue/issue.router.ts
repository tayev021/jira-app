import { Router } from 'express';
import { protect } from '../../shared/middleware/protect';
import { validateQueryParams } from '../../shared/middleware/validateQueryParams';
import { issueController } from './issue.controller';
import { validateBody } from '../../shared/middleware/validateBody';
import { issueValidations } from './issue.validation';

const issueRouter = Router();

issueRouter.get(
  '/',
  protect,
  validateQueryParams(issueValidations.getIssuesSchema),
  issueController.getIssues
);
issueRouter.get('/me', protect, issueController.getMyIssues);
issueRouter.get('/:issueId', protect, issueController.getIssue);
issueRouter.post(
  '/',
  protect,
  validateBody(issueValidations.createIssueSchema),
  issueController.create
);
issueRouter.patch(
  '/:issueId/title',
  protect,
  validateBody(issueValidations.updateTitleSchema),
  issueController.updateTitle
);
issueRouter.patch(
  '/:issueId/description',
  protect,
  validateBody(issueValidations.updateDescriptionSchema),
  issueController.updateDescription
);
issueRouter.patch(
  '/:issueId/status',
  protect,
  validateBody(issueValidations.updateStatusSchema),
  issueController.updateStatus
);
issueRouter.patch(
  '/:issueId/priority',
  protect,
  validateBody(issueValidations.updatePrioritySchema),
  issueController.updatePriority
);
issueRouter.put(
  '/:issueId/assignee',
  protect,
  validateBody(issueValidations.addAssigneeSchema),
  issueController.addAssignee
);
issueRouter.delete(
  '/:issueId/assignee',
  protect,
  validateBody(issueValidations.deleteAssigneeSchema),
  issueController.deleteAssignee
);
issueRouter.delete('/:issueId', protect, issueController.deleteIssue);

export { issueRouter };
