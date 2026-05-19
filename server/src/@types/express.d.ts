import { User } from '../shared/types/User';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User | null;
    }
  }
}
