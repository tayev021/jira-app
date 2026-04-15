import { ApiError } from '../errors';
import { NextFunction, Request, Response } from 'express';

export async function globalErrorHandler(
  error: ApiError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details || null,
      },
    });
  } else {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL',
        message: 'Something went wrong',
        details: null,
      },
    });
  }
}
