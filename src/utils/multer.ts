import { Request } from 'express';
import multer from 'multer';
import fs from 'fs';


async function ensureDir(directory: string): Promise<void> {
  try {
    await fs.promises.access(directory, fs.constants.F_OK);
  } catch (e) {
    await fs.promises.mkdir(directory, { recursive: true });
    // console.log("errors", e);
  }
}

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    const dir = "uploads/user_profiles"; 
    ensureDir(dir);
    cb(null, dir); 
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Use a unique filename
  }
});

const upload = multer({ storage: storage });

// export const uploaded = upload.fields([
//   { name: "profileImage", maxCount: 1 }, 
//   { name: 'image', maxCount: 1 }, 
// ]);

export const uploaded = multer({
  storage: storage
}).fields([
  { name: 'profileImage', maxCount: 1 },  
  { name: 'image', maxCount: 1 },         
]);

