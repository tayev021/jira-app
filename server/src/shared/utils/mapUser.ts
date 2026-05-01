import { User } from '../../modules/user/user.model';
import { CurrentUser } from '../types/CurrentUser';

export function mapUser(user: User): CurrentUser {
  return {
    id: user._id.toString(),
    name: user.name,
    surname: user.surname,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
