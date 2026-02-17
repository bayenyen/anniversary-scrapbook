import Scrapbook from '../models/Scrapbook.js';
import Memory from '../models/Memory.js';
import LoveLetter from '../models/LoveLetter.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export const createScrapbook = async (req, res, next) => {
  try {
    const { title, themeColor, anniversaryDate } = req.body;
    const userId = req.userId;

    if (!title || !anniversaryDate) {
      return res.status(400).json({ message: 'Title and anniversaryDate are required' });
    }

    const shareToken = uuidv4();
    const scrapbook = new Scrapbook({
      userId,
      title,
      themeColor: themeColor || '#FFB6C1',
      anniversaryDate,
      shareToken,
    });

    await scrapbook.save();

    res.status(201).json({
      message: 'Scrapbook created successfully',
      scrapbook,
    });
  } catch (error) {
    next(error);
  }
};

export const getScrapbooks = async (req, res, next) => {
  try {
    const userId = req.userId;
    const scrapbooks = await Scrapbook.find({ userId }).sort({ createdAt: -1 });

    res.json({
      scrapbooks,
    });
  } catch (error) {
    next(error);
  }
};

export const getScrapbookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const scrapbook = await Scrapbook.findById(id);

    if (!scrapbook) {
      return res.status(404).json({ message: 'Scrapbook not found' });
    }

    if (scrapbook.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const memories = await Memory.find({ scrapbookId: id }).sort({ date: 1 });
    const loveLetter = await LoveLetter.findOne({ scrapbookId: id });

    res.json({
      scrapbook,
      memories,
      loveLetter,
    });
  } catch (error) {
    next(error);
  }
};

export const updateScrapbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, themeColor, isPublic, accessPassword } = req.body;

    const scrapbook = await Scrapbook.findById(id);

    if (!scrapbook) {
      return res.status(404).json({ message: 'Scrapbook not found' });
    }

    if (scrapbook.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (title) scrapbook.title = title;
    if (themeColor) scrapbook.themeColor = themeColor;
    if (isPublic !== undefined) scrapbook.isPublic = isPublic;

    if (accessPassword) {
      scrapbook.accessPassword = await bcrypt.hash(accessPassword, 10);
    }

    scrapbook.updatedAt = Date.now();
    await scrapbook.save();

    res.json({
      message: 'Scrapbook updated successfully',
      scrapbook,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteScrapbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const scrapbook = await Scrapbook.findById(id);

    if (!scrapbook) {
      return res.status(404).json({ message: 'Scrapbook not found' });
    }

    if (scrapbook.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Memory.deleteMany({ scrapbookId: id });
    await LoveLetter.deleteOne({ scrapbookId: id });
    await Scrapbook.findByIdAndDelete(id);

    res.json({
      message: 'Scrapbook deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicScrapbook = async (req, res, next) => {
  try {
    const { shareToken } = req.params;
    const { password } = req.body;

    const scrapbook = await Scrapbook.findOne({ shareToken });

    if (!scrapbook || !scrapbook.isPublic) {
      return res.status(404).json({ message: 'Scrapbook not found' });
    }

    if (scrapbook.accessPassword) {
      const isPasswordValid = await bcrypt.compare(password || '', scrapbook.accessPassword);
      if (!isPasswordValid) {
        return res.status(403).json({ message: 'Invalid password' });
      }
    }

    const memories = await Memory.find({ scrapbookId: scrapbook._id }).sort({ date: 1 });
    const loveLetter = await LoveLetter.findOne({ scrapbookId: scrapbook._id });

    res.json({
      scrapbook,
      memories,
      loveLetter,
    });
  } catch (error) {
    next(error);
  }
};
