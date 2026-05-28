import { Router } from 'express';
import { protect } from '../../shared/middleware/protect';
import { userController } from './user.controller';
import { validateQueryParams } from '../../shared/middleware/validateQueryParams';
import { userValidation } from './user.validation';
import { uploadAvatar } from '../../shared/middleware/upload';
import { resizeAvatar } from '../../shared/middleware/resizeAvatar';
import { validateBody } from '../../shared/middleware/validateBody';

const userRouter = Router();

userRouter.get('/', protect, userController.getUsers);
userRouter.get('/:userId', protect, userController.getUser);
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
userRouter.patch(
  '/bio',
  protect,
  validateBody(userValidation.updateBio),
  userController.updateBio
);
userRouter.delete('/', protect, userController.deleteAccount);

export { userRouter };
