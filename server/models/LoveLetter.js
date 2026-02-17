import mongoose from 'mongoose';

const loveLetterSchema = new mongoose.Schema({
  scrapbookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scrapbook',
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  revealDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('LoveLetter', loveLetterSchema);
