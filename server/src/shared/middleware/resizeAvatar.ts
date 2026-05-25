import { catchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';

export const resizeAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const resizedImage = await sharp(req.file.buffer)
      .resize(256, 256, { fit: 'cover' })
      .toFormat('jpeg')
      .toBuffer();

    req.file.buffer = resizedImage;

    next();
  }
);
