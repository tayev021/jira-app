import { Request, Response } from 'express';
import { catchAsync } from '../../shared/utils/catchAsync';
import { issueService } from './issue.service';

class IssueController {
  getIssues = catchAsync(async (req: Request, res: Response) => {
    const { issues } = await issueService.getIssues({
      workspaceId: req.query.workspaceId as string,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issues } });
  });

  getMyIssues = catchAsync(async (req: Request, res: Response) => {
    const { issues } = await issueService.getMyIssues({
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issues } });
  });

  getIssue = catchAsync(async (req: Request, res: Response) => {
    const { issue } = await issueService.getIssue({
      issueId: req.params.issueId as string,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  create = catchAsync(async (req: Request, res: Response) => {
    const { title, description, priority, workspaceId } = req.body;
    const { issue } = await issueService.create({
      title,
      description,
      priority,
      workspaceId,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  updateTitle = catchAsync(async (req: Request, res: Response) => {
    const { issue } = await issueService.updateTitle({
      issueId: req.params.issueId as string,
      title: req.body.title,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  updateDescription = catchAsync(async (req: Request, res: Response) => {
    const { issue } = await issueService.updateDescription({
      issueId: req.params.issueId as string,
      description: req.body.description,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  updateStatus = catchAsync(async (req: Request, res: Response) => {
    const { issue } = await issueService.updateStatus({
      issueId: req.params.issueId as string,
      status: req.body.status,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  updatePriority = catchAsync(async (req: Request, res: Response) => {
    const { issue } = await issueService.updatePriority({
      issueId: req.params.issueId as string,
      priority: req.body.priority,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  addAssignee = catchAsync(async (req: Request, res: Response) => {
    const { issue } = await issueService.addAssignee({
      issueId: req.params.issueId as string,
      assigneeId: req.body.assigneeId,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  deleteAssignee = catchAsync(async (req: Request, res: Response) => {
    const { issue } = await issueService.deleteAssignee({
      issueId: req.params.issueId as string,
      assigneeId: req.body.assigneeId,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { issue } });
  });

  deleteIssue = catchAsync(async (req: Request, res: Response) => {
    await issueService.deleteIssue({
      issueId: req.params.issueId as string,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: {} });
  });
}

export const issueController = new IssueController();
