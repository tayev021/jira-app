import { AppError } from './AppError';

export class UnauthorizedError extends AppError {
  constructor() {
    super(
      401,
      'UNAUTHORIZED',
      'You are not signed in! Please sign in to get access!'
    );
  }
}
