import { AppError } from './AppError';
import { FieldValidationError } from '../types/FieldValidationError';

export class ValidationError extends AppError {
  constructor(message: string, fields: FieldValidationError[]) {
    super(400, 'VALIDATION_ERROR', message, { fields });
  }
}
