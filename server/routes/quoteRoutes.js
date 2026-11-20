import express from 'express';
import {
  getRandomQuote,
  getQuoteHistory,
  deleteQuote,
  clearHistory,
} from '../controllers/quoteController.js';

const router = express.Router();

router.get('/random', getRandomQuote);
router.get('/history', getQuoteHistory);
router.delete('/history/:id', deleteQuote);
router.delete('/history', clearHistory);

export default router;