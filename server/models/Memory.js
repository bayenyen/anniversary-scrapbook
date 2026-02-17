import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
  scrapbookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scrapbook',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  mood: {
    type: String,
    enum: ['happy', 'romantic', 'adventurous', 'nostalgic', 'grateful', 'excited'],
    default: 'romantic',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Memory', memorySchema);
