import { AppError } from './AppError';

export class UnauthorizedError extends AppError {
  constructor(
    message = 'You are not signed in! Please sign in to get access!'
  ) {
    super(401, 'UNAUTHORIZED', message);
  }
}
