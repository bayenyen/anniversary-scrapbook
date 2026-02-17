import express from 'express';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import {
  addMemory,
  getMemories,
  updateMemory,
  deleteMemory,
} from '../controllers/memoryController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/memories/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('image'), addMemory);
router.get('/:scrapbookId', authMiddleware, getMemories);
router.put('/:id', authMiddleware, updateMemory);
router.delete('/:id', authMiddleware, deleteMemory);

export default router;
