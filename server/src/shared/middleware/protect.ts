import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { verifyJwtAsync } from '../utils/verifyJwtAsync';
import { User } from '../../modules/user/user.model';
import { catchAsync } from '../utils/catchAsync';

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new UnauthorizedError();
    }

    let decoded;

    try {
      decoded = await verifyJwtAsync(token);
    } catch {
      throw new UnauthorizedError(
        'Your token is invalid or expired. Please sign in again'
      );
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new UnauthorizedError(
        'This token belongs to a user who does not exist'
      );
    }

    req.currentUser = {
      id: user._id.toString(),
      name: user.name,
      surname: user.surname,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    next();
  }
);
