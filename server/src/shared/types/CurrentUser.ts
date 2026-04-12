import { User } from '../../modules/user/user.model';

export type CurrentUser = Pick<
  User,
  'name' | 'surname' | 'email' | 'avatar' | 'createdAt' | 'updatedAt'
> & { id: string };
