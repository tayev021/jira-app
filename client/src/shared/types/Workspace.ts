import type { User } from './User';

export interface Workspace {
  id: string;
  slug: string;
  name: string;
  owner: User;
  members: User[];
  createdAt: string;
  updatedAt: string;
}
