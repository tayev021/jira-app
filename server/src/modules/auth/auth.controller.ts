import { Request, Response } from 'express';
import { authService } from './auth.service';
import { catchAsync } from '../../shared/utils/catchAsync';
import { getCookieOptions } from '../../shared/utils/getCookieOptions';

class AuthController {
  me = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: { user: req.currentUser } });
  };

  signUp = catchAsync(async (req: Request, res: Response) => {
    const { name, surname, email, password } = req.body;
    const { user, token } = await authService.signUp({
      name,
      surname,
      email,
      password,
    });

    res.cookie('token', token, getCookieOptions());
    res.status(201).json({ success: true, data: { user } });
  });

  signIn = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, token } = await authService.signIn({ email, password });

    res.cookie('token', token, getCookieOptions());
    res.status(200).json({ success: true, data: { user } });
  });

  signOut = (req: Request, res: Response) => {
    res.clearCookie('token', getCookieOptions());
    res.status(200).json({ success: true });
  };
}

export const authController = new AuthController();
