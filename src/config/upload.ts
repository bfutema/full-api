import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;
  uploadsFolder: string;

  // limits: { fileSize: number };
  // fileFilter: any;

  multer: { storage: multer.StorageEngine };
  config: { disk: {}; aws: { bucket: string } };
}

const uploadConfig: IUploadConfig = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder,
  // limits: { fileSize: 2 * 1024 * 1024 },
  // fileFilter: (request, file, callback) => {
  //   const allowedMimes = [
  //     'image/jpeg',
  //     'image/pjpeg',
  //     'image/png',
  //     'image/gif',
  //   ];

  //   if (allowedMimes.includes(file.mimetype)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Invalid mime type.'));
  //   }
  // },
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        file.key = fileName;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: { bucket: process.env.STORAGE_BUCKET },
  },
};

export { uploadConfig };
