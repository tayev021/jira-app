import { ApiError } from './ApiError';

export class ForbiddenError extends ApiError {
  constructor() {
    super(
      403,
      'FORBIDDEN',
      'You do not have permission to perform this action'
    );
  }
}
