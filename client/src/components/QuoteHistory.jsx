import React, { useState } from 'react';
import { Trash2, Search, Copy, Check, Calendar, Quote } from 'lucide-react';

export default function QuoteHistory({ history, onDelete, onClearAll, loading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (quote, id) => {
    navigator.clipboard.writeText(`\"${quote.content}\" — ${quote.author}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredHistory = history.filter(
    (item) =>
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Quote History</h2>
          <p className="text-sm text-slate-400">Browse and manage all previously generated quotes stored in database.</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center justify-center space-x-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by quote content or author..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
        />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 bg-slate-900 border border-slate-800 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <Quote className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">No quotes found in history.</p>
          <p className="text-sm text-slate-500 mt-1">Generate some quotes to build your collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition p-6 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <p className="text-slate-200 font-medium text-lg">&ldquo;{item.content}&rdquo;</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-800 pt-4 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400 font-semibold">— {item.author}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.category || 'General'}
                  </span>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-4">
                  <div className="flex items-center text-xs text-slate-500 space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopy(item, item._id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Copy"
                    >
                      {copiedId === item._id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}