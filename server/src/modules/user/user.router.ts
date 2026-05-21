import { Router } from 'express';
import { protect } from '../../shared/middleware/protect';
import { userController } from './user.controller';
import { validateQueryParams } from '../../shared/middleware/validateQueryParams';
import { userValidation } from './user.validation';

const userRouter = Router();

userRouter.get(
  '/search',
  protect,
  validateQueryParams(userValidation.searchUsers),
  userController.searchUsers
);

export { userRouter };
