import { Request } from 'express';
import { NotFoundError } from '../errors';

export function notFoundHandler(req: Request) {
  throw new NotFoundError('Page not found', req.baseUrl);
}
