import type { ErrorCode } from './ErrorCode';
import type { FieldValidationError } from './FieldValidationError';

export interface ApiErrorDto {
  code: ErrorCode;
  message: string;
  details?: { fields: FieldValidationError[] };
}
