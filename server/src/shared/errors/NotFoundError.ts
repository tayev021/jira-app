import { ApiError } from './ApiError';

export class NotFoundError extends ApiError {
  constructor(message: string, path: string) {
    super(404, 'NOT_FOUND', message, { path });
  }
}
