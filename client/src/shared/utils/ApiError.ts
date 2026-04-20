import type { ErrorCode } from '../types/ErrorCode';
import type { FieldValidationError } from '../types/FieldValidationError';
import type { ApiErrorDto } from '../types/ApiErrorDto';

export class ApiError extends Error {
  code: ErrorCode;
  details?: FieldValidationError[];

  constructor(dto: ApiErrorDto) {
    super(dto.message);
    this.code = dto.code;

    if (dto.code === 'VALIDATION_ERROR') {
      this.details = dto.details;
    }
  }
}
