import { User } from '../../modules/user/user.model';
import { IssueUser } from '../types/IssueUser';

export function mapIssueUser(user: User): IssueUser {
  return {
    id: user._id.toString(),
    name: user.name,
    surname: user.surname,
    avatar: user.avatar,
  };
}
