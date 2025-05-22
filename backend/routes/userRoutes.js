    // backend/routes/userRoutes.js

    import express from 'express';
    import { getUserProfile } from '../controllers/userController.js';
    import protect from '../middlewares/authMiddleware.js';

    const router = express.Router();

    // GET user profile
    router.get('/profile', protect, getUserProfile);

    export default router;
