import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';

const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/svg+xml']);
const storage = multer.diskStorage({
  destination: path.resolve('uploads'),
  filename: (_req, file, done) => {
    const extension = path.extname(file.originalname).toLowerCase();
    done(null, `${crypto.randomUUID()}${extension}`);
  }
});

export const uploadLogo = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, done) => {
    if (!allowedTypes.has(file.mimetype)) return done(new Error('Logo must be a PNG, JPG, or SVG image.'));
    done(null, true);
  }
}).single('teamLogo');
