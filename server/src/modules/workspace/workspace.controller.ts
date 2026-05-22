import { Request, Response } from 'express';
import { catchAsync } from '../../shared/utils/catchAsync';
import { workspaceService } from './workspace.service';

class WorkspaceController {
  getWorkspaces = catchAsync(async (req: Request, res: Response) => {
    const { workspaces } = await workspaceService.getWorkspaces({
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { workspaces } });
  });

  getWorkspace = catchAsync(async (req: Request, res: Response) => {
    const { workspace } = await workspaceService.getWorkspace({
      workspaceId: req.params.workspaceId as string,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { workspace } });
  });

  createWorkspace = catchAsync(async (req: Request, res: Response) => {
    const { workspace } = await workspaceService.createWorkspace({
      name: req.body.name,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { workspace } });
  });

  addMember = catchAsync(async (req: Request, res: Response) => {
    const { member } = await workspaceService.addMember({
      workspaceId: req.params.workspaceId as string,
      userId: req.body.userId,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { member } });
  });

  deleteMember = catchAsync(async (req: Request, res: Response) => {
    const { workspace } = await workspaceService.deleteMember({
      workspaceId: req.params.workspaceId as string,
      memberId: req.body.memberId,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { workspace } });
  });

  updateWorkspaceName = catchAsync(async (req: Request, res: Response) => {
    const { workspace } = await workspaceService.updateWorkspaceName({
      workspaceId: req.params.workspaceId as string,
      name: req.body.name,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { workspace } });
  });

  deleteWorkspace = catchAsync(async (req: Request, res: Response) => {
    await workspaceService.deleteWorkspace({
      workspaceId: req.params.workspaceId as string,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: {} });
  });
}

export const workspaceController = new WorkspaceController();
