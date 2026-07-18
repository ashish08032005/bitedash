import React from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';

export default function Hero() {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="relative py-4 sm:py-6">
      {/* Premium Hero Promo Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-rose-600 px-6 py-10 text-white shadow-xl shadow-orange-500/10 sm:px-12 sm:py-16">
        
        {/* Dynamic backdrop graphic element */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl"></div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
            <Icons.Sparkles className="h-3 w-3 text-amber-300 animate-pulse" /> Free Delivery above ₹399
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Hungry? We Deliver <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-100">Happiness</span> to You.
          </h1>
          <p className="text-xs text-rose-50/90 sm:text-sm leading-relaxed max-w-md">
            Order fresh recipe food crafted by top local chefs. Savor gourmet flavours with lightning-fast delivery and real-time status tracking.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="rounded-2xl bg-white/10 border border-white/5 px-4 py-2 text-center backdrop-blur-md">
              <span className="block text-lg font-bold">15-30 Min</span>
              <span className="text-[10px] text-rose-100/80">Lightning Delivery</span>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/5 px-4 py-2 text-center backdrop-blur-md">
              <span className="block text-lg font-bold">4.8 ★</span>
              <span className="text-[10px] text-rose-100/80">Highest Rated</span>
            </div>
          </div>
        </div>

        {/* Floating food image preview on desktop */}
        <div className="absolute bottom-4 right-12 top-4 hidden w-80 lg:block">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60"
            alt="Delicious Food Basket"
            className="h-full w-full rounded-2xl object-cover shadow-2xl ring-4 ring-white/10 rotate-2 transition-all duration-300 hover:rotate-0 hover:scale-102"
          />
        </div>
      </div>

      {/* Horizontal Category Selector */}
      <div className="mt-8">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">What's on your mind?</h2>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {categories.map((category) => {
            const IconComponent = Icons[category.icon] || Icons.Utensils;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex min-w-[90px] flex-col items-center gap-2.5 rounded-2xl p-3 transition-all duration-200 snap-start border ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/10 text-orange-500 shadow-md shadow-orange-500/5 dark:bg-orange-500/10 dark:text-orange-400'
                    : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-800/80'
                }`}
              >
                {category.image ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-transparent">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-850 dark:text-slate-400'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                )}
                <span className="text-[11px] font-bold tracking-wide">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
