import { User as UserModel } from '../../modules/user/user.model';
import { User } from '../types/User';

export function mapUser(user: UserModel): User {
  return {
    id: user._id.toString(),
    name: user.name,
    surname: user.surname,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
