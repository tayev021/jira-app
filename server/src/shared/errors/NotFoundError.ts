import { AppError } from './AppError';

export class NotFoundError extends AppError {
  constructor(message: string, path: string) {
    super(404, 'NOT_FOUND', message, { path });
  }
}
