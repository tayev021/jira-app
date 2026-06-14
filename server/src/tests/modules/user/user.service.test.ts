import { User } from '../../../modules/user/user.model';
import bcrypt from 'bcryptjs';
import { userService } from '../../../modules/user/user.service';
import mongoose from 'mongoose';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { getNextSequence } from '../../../modules/issue/utils/getNextSequence';
import { Issue } from '../../../modules/issue/issue.model';
import sharp from 'sharp';
import { removeFile } from '../../../shared/utils/removeFile';

function createMockFile(): Express.Multer.File {
  return {
    buffer: Buffer.from('fake image'),
  } as Express.Multer.File;
}

jest.mock('sharp', () => {
  return jest.fn(() => ({
    toFile: jest.fn().mockResolvedValue(undefined),
  }));
});
jest.mock('../../../shared/utils/removeFile');

describe('TEST modules/user/user.service.ts', () => {
  it('UserService.getUsers should return mapped users', async () => {
    await User.create({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });
    await User.create({
      name: 'Test2',
      surname: 'Test2',
      email: 'test2@test.com',
      password: await bcrypt.hash('test2', 10),
    });
    const { users } = await userService.getUsers();

    expect(users[0].name).toBe('Test');
    expect(users[0].surname).toBe('Test');
    expect(users[0].email).toBe('test@test.com');
    expect(users[1].name).toBe('Test2');
    expect(users[1].surname).toBe('Test2');
    expect(users[1].email).toBe('test2@test.com');
  });

  it('UserService.getUser should return mapped user', async () => {
    const id = new mongoose.Types.ObjectId();
    await User.create({
      _id: id,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });
    const { user } = await userService.getUser({ userId: id.toString() });

    expect(user.name).toBe('Test');
    expect(user.surname).toBe('Test');
    expect(user.email).toBe('test@test.com');
  });

  it('UserService.getUser should return error if user id is wrong', async () => {
    await expect(
      userService.getUser({
        userId: new mongoose.Types.ObjectId().toString(),
      })
    ).rejects.toThrow('User with this ID does not exist');
  });

  it('UserService.createUser should create user', async () => {
    await userService.createUser({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });
    const user = await User.findOne({
      email: 'test@test.com',
    });

    expect(user).not.toBe(null);
    expect(user?.name).toBe('Test');
    expect(user?.surname).toBe('Test');
    expect(user?.email).toBe('test@test.com');
  });

  it('UserService.getByEmail should return user by email', async () => {
    await User.create({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });
    const user = await userService.getUserByEmail('test@test.com');

    expect(user).not.toBe(null);
    expect(user?.name).toBe('Test');
    expect(user?.surname).toBe('Test');
    expect(user?.email).toBe('test@test.com');
  });

  it('UserService.searchUsers should return error if workspace id does not exist', async () => {
    await expect(
      userService.searchUsers({
        query: 'test',
        workspaceId: new mongoose.Types.ObjectId().toString(),
      })
    ).rejects.toThrow('Workspace with this ID does not exist');
  });

  it('UserService.searchUsers should return searched users', async () => {
    const ownerId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();
    await User.create({
      _id: ownerId,
      name: 'Owner',
      surname: 'Owner',
      email: 'owner@test.com',
      password: await bcrypt.hash('owner', 10),
    });
    await User.create({
      _id: userId,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: ownerId,
      memberIds: [ownerId],
    });
    const { users } = await userService.searchUsers({
      query: 'test',
      workspaceId: workspace._id.toString(),
    });

    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Test');
    expect(users[0].surname).toBe('Test');
    expect(users[0].email).toBe('test@test.com');
  });

  it('UserService.searchUsers should return searched users exclude members', async () => {
    const ownerId = new mongoose.Types.ObjectId();
    const memberId = new mongoose.Types.ObjectId();
    await User.create({
      _id: ownerId,
      name: 'Owner',
      surname: 'Owner',
      email: 'owner@test.com',
      password: await bcrypt.hash('owner', 10),
    });
    await User.create({
      _id: memberId,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: ownerId,
      memberIds: [ownerId, memberId],
    });
    const { users } = await userService.searchUsers({
      query: 'test',
      workspaceId: workspace._id.toString(),
    });

    expect(users.length).toBe(0);
  });

  it('UserService.updateAvatar should throw error if file is not provided', async () => {
    await expect(
      userService.updateAvatar({
        file: undefined,
        currentUserId: new mongoose.Types.ObjectId().toString(),
      })
    ).rejects.toThrow('Please upload only correct images');
  });

  it('UserService.updateAvatar should throw error if user does not exist', async () => {
    const file = createMockFile();
    await expect(
      userService.updateAvatar({
        file: file,
        currentUserId: new mongoose.Types.ObjectId().toString(),
      })
    ).rejects.toThrow('User with this ID does not exist');
  });

  it('UserService.updateAvatar should throw error if user does not exist', async () => {
    const id = new mongoose.Types.ObjectId();
    await User.create({
      _id: id,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
      avatar: '',
    });
    const file = createMockFile();
    await userService.updateAvatar({
      file,
      currentUserId: id.toString(),
    });
    const updated = await User.findById(id);

    expect(updated?.avatar).toMatch(/^avatar-.*\.jpeg$/);
    expect(sharp).toHaveBeenCalledWith(file.buffer);
  });

  it('UserService.updateAvatar should delete previous avatar', async () => {
    const id = new mongoose.Types.ObjectId();
    await User.create({
      _id: id,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
      avatar: 'old-avatar.jpeg',
    });
    const file = createMockFile();
    await userService.updateAvatar({
      file,
      currentUserId: id.toString(),
    });

    expect(removeFile).toHaveBeenCalledWith(
      'public/images/avatars/old-avatar.jpeg'
    );
  });

  it('UserService.updateBio should throw error if user with this id does not exist', async () => {
    await expect(
      userService.updateBio({
        bio: 'test bio',
        currentUserId: new mongoose.Types.ObjectId().toString(),
      })
    ).rejects.toThrow('User with this ID does not exist');
  });

  it('UserService.updateBio should update user bio', async () => {
    const id = new mongoose.Types.ObjectId();
    await User.create({
      _id: id,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });

    await userService.updateBio({
      bio: 'test bio',
      currentUserId: id.toString(),
    });

    const user = await User.findById(id);

    expect(user?.bio).toBe('test bio');
  });

  it('UserService.deleteAccount should throw error if user with this id does not exist', async () => {
    await expect(
      userService.deleteAccount({
        userId: new mongoose.Types.ObjectId().toString(),
      })
    ).rejects.toThrow('User with this ID does not exist');
  });

  it('UserService.deleteAccount should throw error if user has active workspaces', async () => {
    const ownerId = new mongoose.Types.ObjectId();
    await User.create({
      _id: ownerId,
      name: 'Owner',
      surname: 'Owner',
      email: 'owner@test.com',
      password: await bcrypt.hash('owner', 10),
    });
    await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: ownerId,
      memberIds: [ownerId],
    });

    await expect(
      userService.deleteAccount({
        userId: ownerId.toString(),
      })
    ).rejects.toThrow(
      `You have active workspaces. You cannot delete your account`
    );
  });

  it('UserService.deleteAccount should throw error if user has reported issues', async () => {
    const ownerId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();
    const workspaceId = new mongoose.Types.ObjectId();
    const workspaceSlug = await generateUniqueSlug('Workspace Test Name');
    await User.create({
      _id: ownerId,
      name: 'Owner',
      surname: 'Owner',
      email: 'owner@test.com',
      password: await bcrypt.hash('owner', 10),
    });
    await User.create({
      _id: userId,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });
    await Workspace.create({
      _id: workspaceId,
      name: 'Workspace Test Name',
      slug: workspaceSlug,
      ownerId: ownerId,
      memberIds: [ownerId, userId],
    });
    const seq = await getNextSequence(workspaceId);
    await Issue.create({
      slug: `${workspaceSlug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId,
      reporterId: userId,
    });

    await expect(
      userService.deleteAccount({
        userId: userId.toString(),
      })
    ).rejects.toThrow(
      `You have reported issues. You cannot delete your account`
    );
  });

  it('UserService.deleteAccount should delete account', async () => {
    const id = new mongoose.Types.ObjectId();
    await User.create({
      _id: id,
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('test', 10),
    });

    await userService.deleteAccount({ userId: id.toString() });

    const user = await User.findById(id);

    expect(user).toBe(null);
  });
});
