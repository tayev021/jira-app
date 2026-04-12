import { CurrentUser } from '../shared/types/CurrentUser';

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser | null;
    }
  }
}
