// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());

// Import routes
import authRoutes from './routes/authRoutes.js';
import excelRoutes from './routes/excelRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chartRoutes from './routes/chartRoutes.js'; // Ensure this is imported correctly

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/charts', chartRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).send('✅ Welcome to Excel Analytics API!');
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong!',
  });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
