import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Inspiration',
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;