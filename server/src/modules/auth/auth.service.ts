import { userService } from '../user/user.service';
import { ApiError, UnauthorizedError } from '../../shared/errors';
import bcrypt from 'bcryptjs';
import { signToken } from '../../shared/utils/signToken';
import { mapUser } from '../../shared/utils/mapUser';

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

    const token = signToken({ id: user._id.toString() });

    return { user: mapUser(user), token };
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

    const token = signToken({ id: user._id.toString() });

    return { user: mapUser(user), token };
  };
}

export const authService = new AuthService();
