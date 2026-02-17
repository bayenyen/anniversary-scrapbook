import Memory from '../models/Memory.js';
import Scrapbook from '../models/Scrapbook.js';

export const addMemory = async (req, res, next) => {
  try {
    const { scrapbookId, caption, date, location, mood } = req.body;
    const image = req.file ? `uploads/memories/${req.file.filename}` : req.body.image;

    if (!scrapbookId || !image || !date) {
      return res.status(400).json({ message: 'Scrapbook ID, image, and date are required' });
    }

    const scrapbook = await Scrapbook.findById(scrapbookId);
    if (!scrapbook || scrapbook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const memory = new Memory({
      scrapbookId,
      image,
      caption: caption || '',
      date,
      location: location || '',
      mood: mood || 'romantic',
    });

    await memory.save();

    res.status(201).json({
      message: 'Memory added successfully',
      memory,
    });
  } catch (error) {
    next(error);
  }
};

export const getMemories = async (req, res, next) => {
  try {
    const { scrapbookId } = req.params;

    const scrapbook = await Scrapbook.findById(scrapbookId);
    if (!scrapbook || scrapbook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const memories = await Memory.find({ scrapbookId }).sort({ date: 1 });

    res.json({
      memories,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMemory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { caption, date, location, mood } = req.body;

    const memory = await Memory.findById(id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    const scrapbook = await Scrapbook.findById(memory.scrapbookId);
    if (!scrapbook || scrapbook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (caption !== undefined) memory.caption = caption;
    if (date) memory.date = date;
    if (location !== undefined) memory.location = location;
    if (mood) memory.mood = mood;

    await memory.save();

    res.json({
      message: 'Memory updated successfully',
      memory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMemory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const memory = await Memory.findById(id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    const scrapbook = await Scrapbook.findById(memory.scrapbookId);
    if (!scrapbook || scrapbook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Memory.findByIdAndDelete(id);

    res.json({
      message: 'Memory deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
