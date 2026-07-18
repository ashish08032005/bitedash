import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { X, Trash2, ShoppingBag, Plus, Minus, Tag, Percent } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    activeCoupon,
    couponError,
    applyCouponCode,
    removeCoupon,
    appliedDiscount,
    deliveryFee,
    tax,
    cartTotal
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const success = applyCouponCode(couponInput);
    if (success) {
      setSuccessMsg('Coupon applied successfully!');
      setCouponInput('');
    } else {
      setSuccessMsg('');
    }
  };

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Drawer Panel */}
        <div className="pointer-events-auto w-screen max-w-md transform bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-950 flex flex-col h-full border-l dark:border-slate-850 animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-850">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Shopping Cart</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-650 dark:bg-slate-900 dark:text-slate-400">
                {cart.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-650 dark:hover:bg-slate-900/60"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cart.length === 0 ? (
              // Empty State
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="rounded-full bg-orange-500/10 p-6 border border-orange-500/10">
                  <ShoppingBag className="h-10 w-10 text-orange-500" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-300">Your cart is empty</h3>
                <p className="mt-1 text-xs text-slate-400 max-w-xs dark:text-slate-500 leading-normal">
                  Good food is always cooking! Go ahead and add some delicious meals to your cart.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20"
                >
                  Browse Dishes
                </button>
              </div>
            ) : (
              // Cart items list
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 dark:border-slate-850"
                  >
                    {/* Item Image */}
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-block h-2 w-2 rounded-full flex-shrink-0 ${item.dish.veg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        <h4 className="text-xs font-bold text-slate-800 truncate dark:text-slate-200">{item.dish.name}</h4>
                      </div>
                      
                      {/* Customizations */}
                      {(item.selectedSize || item.selectedExtras.length > 0) && (
                        <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                          {item.selectedSize && `Size: ${item.selectedSize.name}`}
                          {item.selectedSize && item.selectedExtras.length > 0 && ' | '}
                          {item.selectedExtras.length > 0 && `Extras: ${item.selectedExtras.map(e => e.name).join(', ')}`}
                        </p>
                      )}

                      <span className="block mt-1 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                        ₹{item.totalUnitPrice}
                      </span>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 hover:text-rose-500 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center rounded-lg bg-slate-100 p-0.5 dark:bg-slate-900 dark:border dark:border-slate-800">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-1.5 py-0.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-slate-750 dark:text-slate-350">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-1.5 py-0.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 p-5 bg-slate-50/50 dark:border-slate-850 dark:bg-slate-900/40 space-y-4">
              
              {/* Coupon Section */}
              {activeCoupon ? (
                <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Percent className="h-4 w-4" />
                    <span>'{activeCoupon.code}' Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-rose-500 text-[10px] font-bold uppercase transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Enter Promo Code (e.g. BITE20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-800 px-4 text-xs font-bold text-white hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Coupon messages */}
              {couponError && <p className="text-[10px] text-rose-500 font-semibold">{couponError}</p>}
              {successMsg && !couponError && <p className="text-[10px] text-emerald-600 font-semibold">{successMsg}</p>}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-750 dark:text-slate-350">₹{cartSubtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Code</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-755 dark:text-slate-300">
                    {deliveryFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST Taxes (5%)</span>
                  <span className="font-semibold text-slate-755 dark:text-slate-300">₹{tax}</span>
                </div>
                
                <div className="flex justify-between border-t border-slate-250/50 pt-2 text-sm font-extrabold text-slate-800 dark:border-slate-850 dark:text-slate-50">
                  <span>Total Amount</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full flex justify-center items-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:opacity-98 transition active:scale-98"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
