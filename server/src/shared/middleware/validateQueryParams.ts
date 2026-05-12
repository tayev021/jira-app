import { ZodType } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors';

export function validateQueryParams<T extends ZodType>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.query) {
      throw new ValidationError('Failed to parse received data');
    }

    const result = schema.safeParse(req.query);

    if (!result.success) {
      const fields = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new ValidationError('Validation failed', fields);
    }

    return next();
  };
}
