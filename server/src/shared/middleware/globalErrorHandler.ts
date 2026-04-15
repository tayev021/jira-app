import { AppError } from '../errors';
import { NextFunction, Request, Response } from 'express';

export async function globalErrorHandler(
  error: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    res.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details || null,
      },
    });
  } else {
    res.status(500).json({
      code: 'INTERNAL',
      message: 'Something went wrong',
    });
  }
}
