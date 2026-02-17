import mongoose from 'mongoose';

const scrapbookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  themeColor: {
    type: String,
    default: '#FFB6C1',
  },
  coverImage: {
    type: String,
    default: null,
  },
  anniversaryDate: {
    type: Date,
    required: true,
  },
  backgroundMusic: {
    type: String,
    default: null,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  accessPassword: {
    type: String,
    default: null,
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true,
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

export default mongoose.model('Scrapbook', scrapbookSchema);
