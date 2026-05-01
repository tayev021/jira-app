import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { verifyAccessToken } from '../utils/verifyAccessToken';
import { User } from '../../modules/user/user.model';
import { catchAsync } from '../utils/catchAsync';
import { mapUser } from '../utils/mapUser';

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('No access token');
    }

    const accessToken = authHeader.split(' ')[1];
    let decoded;

    try {
      decoded = await verifyAccessToken(accessToken);
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

    req.currentUser = mapUser(user);
    next();
  }
);
