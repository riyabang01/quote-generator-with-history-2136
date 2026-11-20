import axios from 'axios';
import Quote from '../models/Quote.js';

const fallbackQuotes = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Work"
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "Innovation"
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams"
  },
  {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Perseverance"
  },
  {
    content: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Wisdom"
  },
  {
    content: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: "Change"
  }
];

export const getRandomQuote = async (req, res) => {
  try {
    let quoteData = {};
    
    try {
      const response = await axios.get('https://api.quotable.io/random', { timeout: 3000 });
      quoteData = {
        content: response.data.content,
        author: response.data.author,
        category: response.data.tags && response.data.tags.length > 0 ? response.data.tags[0] : 'Inspiration'
      };
    } catch (externalErr) {
      const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteData = randomFallback;
    }

    const newQuote = new Quote(quoteData);
    await newQuote.save();

    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getQuoteHistory = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByIdAndDelete(id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const clearHistory = async (req, res) => {
  try {
    await Quote.deleteMany({});
    res.status(200).json({ message: 'History cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};