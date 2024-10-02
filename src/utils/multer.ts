import { Request } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

async function ensureDir(directory: string): Promise<void> {
  try {
    await fs.promises.access(directory, fs.constants.F_OK);
  } catch (e) {
    await fs.promises.mkdir(directory, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: async (req: Request, file: Express.Multer.File, cb) => {
    let dir: string;
    if (file.fieldname === 'profileImage') {
      dir = "uploads/user_profiles";
    } else if (file.fieldname === 'media') {
      dir = "uploads/blog_media";
    } else {
      dir = "uploads/misc";
    }
    await ensureDir(dir);
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.fieldname === 'media') {
    // Allow both images and videos for 'media' field
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  } else if (file.fieldname === 'profileImage') {
    // Allow only images for 'profileImage' field
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed for profile pictures.'));
    }
  } else {
    cb(new Error('Unexpected field'));
  }
};

export const uploaded = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  }
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'media', maxCount: 1 },
]);