import { ApiError } from './ApiError';

export class UnauthorizedError extends ApiError {
  constructor(
    message = 'You are not signed in! Please sign in to get access!'
  ) {
    super(401, 'UNAUTHORIZED', message);
  }
}
