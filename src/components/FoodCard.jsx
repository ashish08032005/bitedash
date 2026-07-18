import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, Plus, Minus } from 'lucide-react';

export default function FoodCard({ dish, onCustomizeClick }) {
  const { cart, addToCart, updateCartQuantity, favorites, toggleFavorite } = useApp();

  const isFavorited = favorites.includes(dish.id);
  
  // Find if this item is in the cart (non-customized version)
  const cartItem = cart.find(item => item.dish.id === dish.id && !item.selectedSize && item.selectedExtras.length === 0);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (dish.customizable) {
      onCustomizeClick(dish);
    } else {
      addToCart(dish, 1);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-150 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl dark:border-slate-850 dark:bg-slate-900/60 dark:hover:border-slate-800 dark:hover:shadow-orange-500/5">
      
      {/* Food Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Veg/Non-Veg Label floating */}
        <div className="absolute left-3 top-3 z-10 rounded-lg bg-white/95 p-1 backdrop-blur-sm shadow-sm dark:bg-slate-950/95 border border-slate-200/50 dark:border-slate-800">
          <div className={`flex h-4 w-4 items-center justify-center border-2 rounded ${dish.veg ? 'border-emerald-500' : 'border-rose-500'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${dish.veg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </div>
        </div>

        {/* Favorite Heart Trigger */}
        <button
          onClick={() => toggleFavorite(dish.id)}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all active:scale-90 dark:bg-slate-950/90 dark:border dark:border-slate-800 ${
            isFavorited ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500 dark:text-slate-500'
          }`}
        >
          <Heart className={`h-4.5 w-4.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            {dish.rating}
          </span>
          {dish.isPopular && (
            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              Bestseller
            </span>
          )}
        </div>

        <h3 className="mt-2 text-sm font-bold text-slate-800 line-clamp-1 dark:text-slate-100">
          {dish.name}
        </h3>
        <p className="mt-1 flex-1 text-[11px] text-slate-500 line-clamp-2 dark:text-slate-400 leading-normal">
          {dish.description}
        </p>

        {/* Bottom Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
          <div>
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-50">₹{dish.price}</span>
            {dish.customizable && (
              <span className="block text-[9px] text-slate-400 dark:text-slate-500">Customizable</span>
            )}
          </div>

          {/* Add to Cart Switch */}
          {cartQty > 0 ? (
            <div className="flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 font-semibold text-white shadow-sm shadow-orange-500/10">
              <button
                onClick={() => updateCartQuantity(cartItem.cartItemId, cartQty - 1)}
                className="flex h-8 w-8 items-center justify-center transition hover:bg-black/10 rounded-l-xl"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold">{cartQty}</span>
              <button
                onClick={() => updateCartQuantity(cartItem.cartItemId, cartQty + 1)}
                className="flex h-8 w-8 items-center justify-center transition hover:bg-black/10 rounded-r-xl"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 rounded-xl border border-orange-200 bg-white px-3.5 py-1.5 text-xs font-bold text-orange-500 shadow-sm transition hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-orange-400 dark:hover:bg-orange-500 dark:hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
