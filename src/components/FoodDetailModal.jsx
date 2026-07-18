import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Check } from 'lucide-react';

export default function FoodDetailModal({ dish, onClose }) {
  const { addToCart } = useApp();
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Initialize options
  useEffect(() => {
    if (dish) {
      if (dish.sizes && dish.sizes.length > 0) {
        setSelectedSize(dish.sizes[0]);
      }
      setSelectedExtras([]);
      setQuantity(1);
    }
  }, [dish]);

  if (!dish) return null;

  const sizePriceMod = selectedSize ? selectedSize.priceModifier : 0;
  const extrasPriceMod = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = dish.price + sizePriceMod + extrasPriceMod;
  const totalPrice = unitPrice * quantity;

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleExtraToggle = (extra) => {
    setSelectedExtras(prev =>
      prev.some(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedSize, selectedExtras);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-slate-100 dark:border-slate-800 shadow-2xl dark:bg-slate-900 animate-scale-up">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 w-full">
          <img
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/30 text-white border border-white/10 backdrop-blur-md hover:bg-slate-950/50 transition"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="absolute bottom-4 left-5 pr-4 text-white">
            <span className={`inline-block mb-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              dish.veg ? 'bg-emerald-500' : 'bg-rose-500'
            }`}>
              {dish.veg ? 'Veg' : 'Non-Veg'}
            </span>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{dish.name}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[50vh] overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Size Selection */}
          {dish.sizes && dish.sizes.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Select Size</h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Choose any one option</p>
              
              <div className="mt-3 space-y-2">
                {dish.sizes.map((size) => {
                  const isSelected = selectedSize?.name === size.name;
                  return (
                    <label
                      key={size.name}
                      onClick={() => handleSizeChange(size)}
                      className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500/5 dark:border-orange-500 dark:bg-orange-500/10'
                          : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{size.name}</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {size.priceModifier > 0 ? `+₹${size.priceModifier}` : 'Standard'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras Selection */}
          {dish.extras && dish.extras.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Customize Extras</h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Select multiple items to add</p>
              
              <div className="mt-3 space-y-2">
                {dish.extras.map((extra) => {
                  const isChecked = selectedExtras.some(e => e.name === extra.name);
                  return (
                    <button
                      key={extra.name}
                      onClick={() => handleExtraToggle(extra)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 transition text-left ${
                        isChecked
                          ? 'border-orange-500 bg-orange-500/5 dark:border-orange-500 dark:bg-orange-500/10'
                          : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                          isChecked ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-350 dark:border-slate-600'
                        }`}>
                          {isChecked && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">+₹{extra.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-105 p-5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-4">
          
          {/* Quantity selector */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-950 dark:border dark:border-slate-800">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center text-slate-650 dark:text-slate-400 hover:bg-white rounded-lg dark:hover:bg-slate-800 transition shadow-sm"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-extrabold text-slate-800 dark:text-slate-200">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="flex h-8 w-8 items-center justify-center text-slate-650 dark:text-slate-400 hover:bg-white rounded-lg dark:hover:bg-slate-800 transition shadow-sm"
            >
              +
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex justify-between items-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/25 hover:opacity-98 active:scale-98 transition-all"
          >
            <span>Add to Cart</span>
            <span className="font-extrabold text-sm">₹{totalPrice}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
