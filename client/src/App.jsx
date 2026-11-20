import React, { useState, useEffect } from 'react';
import Navbar from './components/ui/Navbar';
import QuoteCard from './components/QuoteCard';
import QuoteHistory from './components/QuoteHistory';
import api from './utils/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [currentQuote, setCurrentQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchNewQuote = async () => {
    setLoading(true);
    try {
      const res = await api.get('/quotes/random');
      setCurrentQuote(res.data);
      fetchHistory();
    } catch (err) {
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await api.get('/quotes/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/quotes/history/${id}`);
      setHistory(history.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting quote:', err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all quote history?')) return;
    try {
      await api.delete('/quotes/history');
      setHistory([]);
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  };

  useEffect(() => {
    fetchNewQuote();
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
        {activeTab === 'generator' ? (
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Daily Inspiration & Wisdom
              </h1>
              <p className="text-slate-400 max-w-lg mx-auto">
                Discover profound thoughts from brilliant minds. Each quote is automatically saved to your persistent history collection.
              </p>
            </div>

            <QuoteCard quote={currentQuote} onFetchNew={fetchNewQuote} loading={loading} />
          </div>
        ) : (
          <QuoteHistory
            history={history}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
            loading={historyLoading}
          />
        )}
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Inspirify. Built with MERN Stack & Tailwind CSS.</p>
      </footer>
    </div>
  );
}