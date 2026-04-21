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
    const { user, accessToken, refreshToken } = await authService.signUp({
      name,
      surname,
      email,
      password,
    });

    res.cookie('refreshToken', refreshToken, getCookieOptions());
    res.status(201).json({ success: true, data: { user, accessToken } });
  });

  signIn = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.signIn({
      email,
      password,
    });

    res.cookie('refreshToken', refreshToken, getCookieOptions());
    res.status(200).json({ success: true, data: { user, accessToken } });
  });

  signOut = catchAsync(async (req: Request, res: Response) => {
    await authService.signOut(req.cookies.refreshToken as string | undefined);

    res.clearCookie('refreshToken', getCookieOptions());
    res.status(200).json({ success: true });
  });

  refresh = catchAsync(async (req: Request, res: Response) => {
    const { accessToken } = await authService.refresh(
      req.cookies.refreshToken as string | undefined
    );

    res.status(200).json({ success: true, data: { accessToken } });
  });
}

export const authController = new AuthController();
