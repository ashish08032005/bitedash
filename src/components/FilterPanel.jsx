import React from 'react';
import { Filter, Star, Sparkles, ArrowUpDown } from 'lucide-react';

export default function FilterPanel({
  vegOnly,
  setVegOnly,
  highRating,
  setHighRating,
  sortBy,
  setSortBy
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 py-5 dark:border-slate-900">
      {/* Active Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
        </div>

        {/* Veg Only Toggle */}
        <button
          onClick={() => setVegOnly(prev => !prev)}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
            vegOnly
              ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <span className={`inline-block h-2 w-2 rounded-full ${vegOnly ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
          Veg Only
        </button>

        {/* Rating 4.5+ Toggle */}
        <button
          onClick={() => setHighRating(prev => !prev)}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
            highRating
              ? 'border-amber-500 bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Star className={`h-3 w-3 ${highRating ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
          4.5+ Rating
        </button>
      </div>

      {/* Sorting Dropdown */}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-slate-400" />
        <span className="text-xs text-slate-500 dark:text-slate-400">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
        >
          <option value="popular">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}
