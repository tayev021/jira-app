import { authService } from '../../../modules/auth/auth.service';
import { verifyAccessToken } from '../../../shared/utils/verifyAccessToken';
import { User } from '../../../modules/user/user.model';
import { verifyRefreshToken } from '../../../shared/utils/verifyRefreshToken';
import { generateRefreshToken } from '../../../shared/utils/generateRefreshToken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

describe('TEST modules/auth/auth.service.ts', () => {
  it('AuthService.signup should create user and tokens', async () => {
    const { user, accessToken, refreshToken } = await authService.signUp({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: 'test',
    });
    const decodedAccessToken = await verifyAccessToken(accessToken);
    const decodedRefreshToken = await verifyRefreshToken(refreshToken);

    expect(user.name).toBe('Test');
    expect(user.surname).toBe('Test');
    expect(user.email).toBe('test@test.com');
    expect(decodedAccessToken.id).toBe(user.id);
    expect(decodedRefreshToken.id).toBe(user.id);

    const findUser = await User.findOne({
      email: 'test@test.com',
    });

    expect(findUser).not.toBeNull();
  });

  it('AuthService.signup should get user data and tokens', async () => {
    await User.create({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });

    const { user, accessToken, refreshToken } = await authService.signIn({
      email: 'test@test.com',
      password: 'test',
    });
    const decodedAccessToken = await verifyAccessToken(accessToken);
    const decodedRefreshToken = await verifyRefreshToken(refreshToken);

    expect(user.name).toBe('Test');
    expect(user.surname).toBe('Test');
    expect(user.email).toBe('test@test.com');
    expect(decodedAccessToken.id).toBe(user.id);
    expect(decodedRefreshToken.id).toBe(user.id);
  });

  it('AuthService.signout should quit user and clear refresh token', async () => {
    const id = new mongoose.Types.ObjectId();
    const refreshToken = generateRefreshToken({ id: id.toString() });
    const user = await User.create({
      _id: id,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
      refreshToken: refreshToken,
    });

    await authService.signOut(refreshToken);

    const findUser = await User.findById(user.id);

    expect(findUser?.refreshToken).toBe(null);
  });

  it('AuthService.refresh should throw if refresh token is not provided', async () => {
    await expect(authService.refresh(undefined)).rejects.toThrow(
      'No refresh token'
    );
  });

  it('AuthService.refresh should throw if refresh token is invalid', async () => {
    await expect(authService.refresh('invalid-token')).rejects.toThrow(
      'Your refresh token is invalid or expired. Please sign in again'
    );
  });

  it('AuthService.refresh should throw if refresh token with invalid id', async () => {
    const refreshToken = generateRefreshToken({
      id: new mongoose.Types.ObjectId().toString(),
    });

    await expect(authService.refresh(refreshToken)).rejects.toThrow(
      'Invalid refresh token'
    );
  });

  it('AuthService.refresh should throw if refresh token is not the same as in the DB', async () => {
    const user = await User.create({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
      refreshToken: 'another-refresh-token',
    });
    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
    });

    await expect(authService.refresh(refreshToken)).rejects.toThrow(
      'Invalid refresh token'
    );
  });

  it('AuthService.refresh should refresh access token', async () => {
    const id = new mongoose.Types.ObjectId();
    const refreshToken = generateRefreshToken({ id: id.toString() });
    const user = await User.create({
      _id: id,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
      refreshToken: refreshToken,
    });

    const result = await authService.refresh(refreshToken);
    const payload = await verifyAccessToken(result.accessToken);

    expect(result).toHaveProperty('accessToken');
    expect(typeof result.accessToken).toBe('string');
    expect(payload.id).toBe(user._id.toString());
  });
});
