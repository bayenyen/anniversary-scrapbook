import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createScrapbook,
  getScrapbooks,
  getScrapbookById,
  updateScrapbook,
  deleteScrapbook,
  getPublicScrapbook,
} from '../controllers/scrapbookController.js';

const router = express.Router();

// Public routes (must be before /:id to avoid conflicts)
router.post('/public/:shareToken', getPublicScrapbook);

// Protected routes
router.post('/', authMiddleware, createScrapbook);
router.get('/', authMiddleware, getScrapbooks);
router.get('/:id', authMiddleware, getScrapbookById);
router.put('/:id', authMiddleware, updateScrapbook);
router.delete('/:id', authMiddleware, deleteScrapbook);

export default router;
