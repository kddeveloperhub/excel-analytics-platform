// routes/chartRoutes.js
import express from 'express';
import { getChartHistory, saveChart } from '../controllers/chartController.js';
import authenticate from '../middlewares/authMiddleware.js'; // ✅ Correct import path

const router = express.Router();

// ✅ GET chart history (only for logged-in user)
router.get('/', authenticate, getChartHistory);

// ✅ POST to save a chart (only for logged-in user)
router.post('/save', authenticate, saveChart);

export default router;
