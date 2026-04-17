export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
