import multer from 'multer';
import { ApiError } from '../errors';

const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (req, file, callback) => {
  if (!file.mimetype.startsWith('image/')) {
    callback(
      new ApiError(400, 'ERROR', 'Not an image! Please upload only images')
    );
  }

  callback(null, true);
};

const createMulter = (limits?: multer.Options['limits']) =>
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
      ...limits,
    },
  });

export const uploadAvatar = createMulter().single('avatar');
