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
}

export const userService = new UserService();
