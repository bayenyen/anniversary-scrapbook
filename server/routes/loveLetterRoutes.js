import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createOrUpdateLoveLetter,
  getLoveLetter,
  deleteLoveLetter,
} from '../controllers/loveLetterController.js';

const router = express.Router();

router.post('/', authMiddleware, createOrUpdateLoveLetter);
router.get('/:scrapbookId', authMiddleware, getLoveLetter);
router.delete('/:scrapbookId', authMiddleware, deleteLoveLetter);

export default router;
