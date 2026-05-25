import { ApiError, ForbiddenError } from '../../shared/errors';
import { mapUser } from '../../shared/utils/mapUser';
import { removeFile } from '../../shared/utils/removeFile';
import { Issue } from '../issue/issue.model';
import { Workspace } from '../workspace/workspace.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';

class UserService {
  getUsers = async () => {
    const users = await User.find();
    return { users: users.map(mapUser) };
  };

  createUser = async (data: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => {
    return User.create(data);
  };

  getUserByEmail = async (email: string) => {
    return User.findOne({ email }).select('+password');
  };

  searchUsers = async (data: { query: string; workspaceId: string }) => {
    const workspace = await Workspace.findById(data.workspaceId).select(
      'memberIds'
    );

    if (!workspace) {
      throw new ApiError(400, 'ERROR', 'Workspace with this ID does not exist');
    }

    const users = await User.find({
      _id: {
        $nin: workspace.memberIds,
      },
      $or: [
        { name: { $regex: data.query, $options: 'i' } },
        { surname: { $regex: data.query, $options: 'i' } },
      ],
    }).limit(10);

    return { users: users.map(mapUser) };
  };

  updateAvatar = async (data: {
    file: Express.Multer.File | undefined;
    currentUserId: string;
  }) => {
    const { file, currentUserId } = data;

    if (!file) {
      throw new ApiError(400, 'ERROR', 'Please upload only correct images');
    }

    const user = await User.findById(currentUserId);

    if (!user) {
      throw new ApiError(400, 'ERROR', 'User with this ID does not exist');
    }

    const avatarFileName = `avatar-${uuid()}.jpeg`;
    const avatarPath = `public/images/avatars/${avatarFileName}`;

    if (user.avatar) {
      removeFile(`public/images/avatars/${user.avatar}`);
    }

    user.avatar = avatarFileName;

    await sharp(file.buffer).toFile(avatarPath);
    await user.save();

    return { user: mapUser(user) };
  };

  deleteAccount = async (data: { userId: string }) => {
    const { userId } = data;

    const ownedWorkspaces = await Workspace.find({ ownerId: userId });

    if (ownedWorkspaces.length > 0) {
      throw new ForbiddenError(
        `You have active workspaces. You cannot delete your account`
      );
    }

    const reportedIssues = await Issue.find({ reporterId: userId });

    if (reportedIssues.length > 0) {
      throw new ForbiddenError(
        `You have reported issues. You cannot delete your account`
      );
    }

    await Promise.all([
      Workspace.updateMany(
        { memberIds: userId },
        {
          $pull: {
            memberIds: userId,
          },
        }
      ),
      Issue.updateMany(
        { assigneeIds: userId },
        {
          $pull: {
            assigneeIds: userId,
          },
        }
      ),
    ]);

    await User.findByIdAndDelete(userId);
  };
}

export const userService = new UserService();
