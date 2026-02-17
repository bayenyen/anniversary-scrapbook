import LoveLetter from '../models/LoveLetter.js';
import Scrapbook from '../models/Scrapbook.js';

export const createOrUpdateLoveLetter = async (req, res, next) => {
  try {
    const { scrapbookId, content, revealDate } = req.body;

    if (!scrapbookId || !content) {
      return res.status(400).json({ message: 'Scrapbook ID and content are required' });
    }

    const scrapbook = await Scrapbook.findById(scrapbookId);
    if (!scrapbook || scrapbook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    let loveLetter = await LoveLetter.findOne({ scrapbookId });

    if (!loveLetter) {
      loveLetter = new LoveLetter({
        scrapbookId,
        content,
        revealDate: revealDate || null,
      });
    } else {
      loveLetter.content = content;
      if (revealDate !== undefined) loveLetter.revealDate = revealDate;
      loveLetter.updatedAt = Date.now();
    }

    await loveLetter.save();

    res.status(loveLetter.isNew ? 201 : 200).json({
      message: 'Love letter saved successfully',
      loveLetter,
    });
  } catch (error) {
    next(error);
  }
};

export const getLoveLetter = async (req, res, next) => {
  try {
    const { scrapbookId } = req.params;

    const scrapbook = await Scrapbook.findById(scrapbookId);
    if (!scrapbook || scrapbook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const loveLetter = await LoveLetter.findOne({ scrapbookId });

    if (!loveLetter) {
      return res.status(404).json({ message: 'Love letter not found' });
    }

    res.json({
      loveLetter,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLoveLetter = async (req, res, next) => {
  try {
    const { scrapbookId } = req.params;

    const scrapbook = await Scrapbook.findById(scrapbookId);
    if (!scrapbook || scrapbook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await LoveLetter.deleteOne({ scrapbookId });

    res.json({
      message: 'Love letter deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
