import { catchAsync } from '../../shared/utils/catchAsync';
import { Request, Response } from 'express';
import { userService } from './user.service';

class UserController {
  getUsers = catchAsync(async (req: Request, res: Response) => {
    const { users } = await userService.getUsers();
    res.status(200).json({ success: true, data: { users } });
  });

  getUser = catchAsync(async (req: Request, res: Response) => {
    const { user } = await userService.getUser({
      userId: req.params.userId as string,
    });
    res.status(200).json({ success: true, data: { user } });
  });

  searchUsers = catchAsync(async (req: Request, res: Response) => {
    const { users } = await userService.searchUsers({
      query: req.query.query as string,
      workspaceId: req.query.workspaceId as string,
    });
    res.status(200).json({ success: true, data: { users } });
  });

  updateAvatar = catchAsync(async (req: Request, res: Response) => {
    const { user } = await userService.updateAvatar({
      file: req.file,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { user } });
  });

  updateBio = catchAsync(async (req: Request, res: Response) => {
    const { user } = await userService.updateBio({
      bio: req.body.bio,
      currentUserId: req.currentUser!.id,
    });
    res.status(200).json({ success: true, data: { user } });
  });

  deleteAccount = catchAsync(async (req: Request, res: Response) => {
    await userService.deleteAccount({ userId: req.currentUser!.id });
    res.status(200).json({ success: true, data: {} });
  });
}

export const userController = new UserController();
