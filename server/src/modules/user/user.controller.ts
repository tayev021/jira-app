import { catchAsync } from '../../shared/utils/catchAsync';
import { Request, Response } from 'express';
import { userService } from './user.service';

class UserController {
  searchUsers = catchAsync(async (req: Request, res: Response) => {
    const { users } = await userService.searchUsers({
      query: req.query.query as string,
    });
    res.status(200).json({ success: true, data: { users } });
  });
}

export const userController = new UserController();
