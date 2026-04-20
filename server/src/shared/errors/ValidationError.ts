import { ApiError } from './ApiError';
import { FieldValidationError } from '../types/FieldValidationError';

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', fields?: FieldValidationError[]) {
    super(400, 'VALIDATION_ERROR', message, fields && { fields });
  }
}
