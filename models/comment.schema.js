import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema({

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Comment = mongoose.model('Comments', commentSchema);