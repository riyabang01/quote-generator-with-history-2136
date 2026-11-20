import React, { useState } from 'react';
import { Quote, RefreshCw, Copy, Check, Heart } from 'lucide-react';

export default function QuoteCard({ quote, onFetchNew, loading }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopy = () => {
    if (!quote) return;
    navigator.clipboard.writeText(`\"${quote.content}\" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
        <div className="absolute -top-4 -left-4 bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-2xl text-indigo-400">
          <Quote className="w-6 h-6" />
        </div>

        <div className="min-h-[160px] flex flex-col justify-center my-4">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
            </div>
          ) : quote ? (
            <>
              <p className="text-xl md:text-2xl font-medium text-slate-100 leading-relaxed mb-6">
                &ldquo;{quote.content}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                <span className="text-indigo-400 font-semibold tracking-wide text-sm md:text-base">
                  — {quote.author}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 uppercase tracking-wider">
                  {quote.category || 'Inspiration'}
                </span>
              </div>
            </>
          ) : (
            <p className="text-slate-400 text-center">Click generate to fetch your first quote!</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              disabled={!quote || loading}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-sm transition disabled:opacity-50"
              title="Copy Quote"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={() => setLiked(!liked)}
              disabled={!quote || loading}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-sm transition disabled:opacity-50 ${
                liked ? 'text-rose-400' : 'text-slate-300'
              }`}
              title="Like Quote"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-400' : ''}`} />
              <span>{liked ? 'Liked' : 'Like'}</span>
            </button>
          </div>

          <button
            onClick={onFetchNew}
            disabled={loading}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition transform active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>New Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}