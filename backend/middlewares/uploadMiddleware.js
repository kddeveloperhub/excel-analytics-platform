// backend/middlewares/uploadMiddleware.js

import multer from 'multer';
import path from 'path';

// In-memory storage (no temp files)
const storage = multer.memoryStorage();

// Filter only .xlsx and .xls
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.xlsx' && ext !== '.xls') {
    cb(new Error('Only Excel files allowed'), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
