import express from 'express';
import {
  uploadExcel,
  getExcelData,
  getUploadHistory, // ✅ Added
} from '../controllers/excelController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadExcel);
router.get('/data', protect, getExcelData);
router.get('/history', protect, getUploadHistory); // ✅ Added

export default router;
