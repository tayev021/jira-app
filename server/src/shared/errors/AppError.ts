import { ErrorCode } from 'shared/types/ErrorCode';

export class AppError extends Error {
  status: number;
  code: ErrorCode;
  details?: unknown;

  constructor(
    status: number,
    code: ErrorCode,
    message: string,
    details?: unknown
  ) {
    super(message);

    this.status = status;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
