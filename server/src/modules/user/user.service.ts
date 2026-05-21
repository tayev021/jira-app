import { mapUser } from '../../shared/utils/mapUser';
import { User } from './user.model';

class UserService {
  createUser = async (userData: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => {
    return User.create(userData);
  };

  getUserByEmail = async (email: string) => {
    return User.findOne({ email }).select('+password');
  };

  searchUsers = async (data: { query: string }) => {
    const users = await User.find({
      $or: [
        { name: { $regex: data.query, $options: 'i' } },
        { surname: { $regex: data.query, $options: 'i' } },
      ],
    }).limit(10);

    return { users: users.map(mapUser) };
  };
}

export const userService = new UserService();
