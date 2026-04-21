import { userService } from '../user/user.service';
import { ApiError, UnauthorizedError } from '../../shared/errors';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../../shared/utils/generateAccessToken';
import { generateRefreshToken } from '../../shared/utils/generateRefreshToken';
import { mapUser } from '../../shared/utils/mapUser';
import { verifyRefreshToken } from '../../shared/utils/verifyRefreshToken';
import { User } from '../user/user.model';

class AuthService {
  signUp = async (userData: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => {
    const existingUser = await userService.getUserByEmail(userData.email);

    if (existingUser) {
      throw new ApiError(400, 'ERROR', `A user with this email already exists`);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken({ id: user._id.toString() });
    const refreshToken = generateRefreshToken({ id: user._id.toString() });
    user.refreshToken = refreshToken;
    await user.save();

    return { user: mapUser(user), accessToken, refreshToken };
  };

  signIn = async (userData: { email: string; password: string }) => {
    const user = await userService.getUserByEmail(userData.email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const accessToken = generateAccessToken({ id: user._id.toString() });
    const refreshToken = generateRefreshToken({ id: user._id.toString() });
    user.refreshToken = refreshToken;
    await user.save();

    return { user: mapUser(user), accessToken, refreshToken };
  };

  signOut = async (refreshToken: string | undefined) => {
    if (!refreshToken) return;

    let decoded;

    try {
      decoded = await verifyRefreshToken(refreshToken);
    } catch {
      return;
    }

    const user = await User.findById(decoded.id);

    if (!user) return;

    user.refreshToken = null;
    await user.save();
  };

  refresh = async (refreshToken: string | undefined) => {
    if (!refreshToken) {
      throw new UnauthorizedError('No refresh token');
    }

    let decoded;

    try {
      decoded = await verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError(
        'Your refresh token is invalid or expired. Please sign in again'
      );
    }

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const accessToken = generateAccessToken({ id: user._id.toString() });

    return { accessToken };
  };
}

export const authService = new AuthService();
