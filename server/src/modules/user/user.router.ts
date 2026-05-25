import { Router } from 'express';
import { protect } from '../../shared/middleware/protect';
import { userController } from './user.controller';
import { validateQueryParams } from '../../shared/middleware/validateQueryParams';
import { userValidation } from './user.validation';
import { uploadAvatar } from '../../shared/middleware/upload';
import { resizeAvatar } from '../../shared/middleware/resizeAvatar';

const userRouter = Router();

userRouter.get('/', protect, userController.getUsers);
userRouter.get(
  '/search',
  protect,
  validateQueryParams(userValidation.searchUsers),
  userController.searchUsers
);
userRouter.patch(
  '/avatar',
  protect,
  uploadAvatar,
  resizeAvatar,
  userController.updateAvatar
);
userRouter.delete('/', protect, userController.deleteAccount);

export { userRouter };
