import { ErrorCode } from './ErrorCode';
import { FieldValidationError } from './FieldValidationError';

interface AppError {
  code: ErrorCode;
  message: string;
}

interface DefaultError extends AppError {
  code: 'ERROR';
}

interface ValidationError extends AppError {
  code: 'ERROR';
  details: FieldValidationError[];
}

interface NotFoundError extends AppError {
  code: 'NOT_FOUND';
}

interface UnauthorizedError extends AppError {
  code: 'UNAUTHORIZED';
}

interface ForbiddenError extends AppError {
  code: 'FORBIDDEN';
}

interface InternalError extends AppError {
  code: 'INTERNAL';
}

export type ApiError =
  | DefaultError
  | ValidationError
  | NotFoundError
  | UnauthorizedError
  | ForbiddenError
  | InternalError;
