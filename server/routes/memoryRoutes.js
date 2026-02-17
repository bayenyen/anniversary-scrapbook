import express from 'express';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import {
  addMemory,
  getMemories,
  updateMemory,
  deleteMemory,
} from '../controllers/memoryController.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'anniversary-scrapbook/memories',
    resource_type: 'auto',
  },
});

const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('image'), addMemory);
router.get('/:scrapbookId', authMiddleware, getMemories);
router.put('/:id', authMiddleware, updateMemory);
router.delete('/:id', authMiddleware, deleteMemory);

export default router;
