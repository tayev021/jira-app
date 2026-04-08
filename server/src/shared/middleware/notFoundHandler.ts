import { Request } from 'express';
import { NotFoundError } from '../errors';

export function NotFoundHandler(req: Request) {
  throw new NotFoundError('Page not found', req.baseUrl);
}
