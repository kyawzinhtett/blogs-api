const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    status: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide author'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
