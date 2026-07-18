import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { downloadReceipt } from '../utils/helpers';
import { MapPin, CreditCard, ArrowLeft, Check, Sparkles, AlertCircle, Lock, Mail, Download } from 'lucide-react';

export default function Checkout() {
  const {
    cart,
    cartSubtotal,
    appliedDiscount,
    deliveryFee,
    tax,
    cartTotal,
    currentUser,
    setIsAuthModalOpen,
    placeOrder
  } = useApp();

  const navigate = useNavigate();

  // Selected Address State
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [newAddressText, setNewAddressText] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // Custom User Addresses
  const [userAddresses, setUserAddresses] = useState([
    { id: 'addr-1', type: 'Home', text: 'Flat 405, Rosewood Heights, Sector 62, Noida' },
    { id: 'addr-2', type: 'Work', text: 'Floor 12, Josh Tech Towers, Sector 135, Noida' }
  ]);

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  
  // Checkout Success Splash Overlay state
  const [orderSuccess, setOrderSuccess] = useState(null);
  
  // Notification toast simulated email state
  const [showEmailToast, setShowEmailToast] = useState(false);

  // If user is logged out, prompt login
  useEffect(() => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
    }
  }, [currentUser]);

  // Trigger simulated email notification toast when orderSuccess changes
  useEffect(() => {
    if (orderSuccess) {
      setShowEmailToast(true);
      const timer = setTimeout(() => {
        setShowEmailToast(false);
      }, 7000); // show for 7 seconds
      return () => clearTimeout(timer);
    }
  }, [orderSuccess]);

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center animate-fade-in">
        <div className="rounded-full bg-slate-100 p-5 inline-block text-slate-400 dark:bg-slate-900">
          <AlertCircle className="h-10 w-10 text-orange-500" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-300">Your cart is empty</h2>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          You must add items to your cart before you can check out.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20"
        >
          Browse Dishes
        </Link>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center animate-fade-in space-y-4">
        <div className="rounded-full bg-slate-100 p-5 inline-block text-slate-400 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Lock className="h-10 w-10 text-orange-500" />
        </div>
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">Secure Checkout Locked</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal max-w-xs mx-auto">
          Please log in or sign up to finalize your delivery details, select payment, and place order.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 active:scale-98 transition"
        >
          Login / Register Now
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    let finalAddress = '';
    
    if (isAddingAddress) {
      if (!newAddressText.trim()) {
        alert('Please enter a delivery address.');
        return;
      }
      finalAddress = newAddressText;
    } else {
      const addr = userAddresses[selectedAddressIndex];
      finalAddress = addr ? addr.text : '';
    }

    if (!finalAddress) {
      alert('Please select or write a delivery address.');
      return;
    }

    const order = placeOrder(finalAddress, paymentMethod);
    if (order) {
      setOrderSuccess(order);
    }
  };

  const handleSaveNewAddress = () => {
    if (newAddressText.trim()) {
      const newAddr = {
        id: `addr-${Date.now()}`,
        type: 'Custom',
        text: newAddressText
      };
      setUserAddresses(prev => [...prev, newAddr]);
      setSelectedAddressIndex(userAddresses.length);
      setIsAddingAddress(false);
      setNewAddressText('');
    } else {
      alert('Address cannot be empty');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10 animate-fade-in relative min-h-[80vh]">
      
      {/* Simulated Email Toast Notification */}
      {showEmailToast && orderSuccess && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-2xl animate-slide-in-right max-w-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-100">Receipt Sent to Email!</h4>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              Sent confirmation receipt to <strong>{currentUser.email}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Checkout Success Overlay */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 text-center shadow-2xl animate-scale-up space-y-6">
            
            {/* Pulsing check circle */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-800 relative">
              <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></span>
              <Check className="relative h-10 w-10 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-400 border border-orange-500/20">
                <Sparkles className="h-3 w-3" /> Order Confirmed
              </span>
              <h2 className="text-2xl font-extrabold text-slate-50">Woohoo! Order Placed!</h2>
              <p className="text-xs text-slate-400">
                Your order <span className="font-bold text-slate-300">#{orderSuccess.id}</span> has been sent to the kitchen.
              </p>
            </div>

            {/* Recap */}
            <div className="rounded-2xl border border-slate-800 p-4 bg-slate-950/50 text-left space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Delivery Location:</span>
                <span className="font-bold text-slate-200 truncate max-w-[200px]">{orderSuccess.address}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Estimated Delivery:</span>
                <span className="font-bold text-orange-500">25 mins</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Payment Mode:</span>
                <span className="font-bold text-slate-200">{orderSuccess.paymentMethod}</span>
              </div>
            </div>

            {/* Simulated Email Confirmation Notice inside modal */}
            <div className="rounded-2xl bg-orange-550/10 border border-orange-500/10 p-3 text-left flex items-start gap-2.5 text-[11px] text-slate-300">
              <Mail className="h-4.5 w-4.5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">Confirmation Sent!</span>
                <p className="mt-0.5 text-slate-400 leading-normal">
                  A copy of receipt was sent to your email <strong>{currentUser.email}</strong>.
                </p>
              </div>
            </div>

            {/* Download & Track CTAs */}
            <div className="flex gap-2">
              <button
                onClick={() => downloadReceipt(orderSuccess, currentUser.name, currentUser.email)}
                className="flex-1 flex justify-center items-center gap-1 rounded-2xl border border-slate-800 py-3.5 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Receipt</span>
              </button>
              <button
                onClick={() => navigate('/tracking')}
                className="flex-1 flex justify-center items-center rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 py-3.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25"
              >
                Track Order Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border border-slate-200 p-2 text-slate-650 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-55 sm:text-2xl">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Address Section */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-855 dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3 dark:border-slate-800">
              <MapPin className="h-5 w-5 text-orange-500" />
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Delivery Address</h2>
            </div>

            {!isAddingAddress ? (
              <div className="space-y-3">
                {userAddresses.map((address, idx) => {
                  const isSelected = selectedAddressIndex === idx;
                  return (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressIndex(idx)}
                      className={`relative flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/20 dark:border-orange-500 dark:bg-orange-950/10'
                          : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected ? 'border-orange-500 text-orange-500' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <span className="h-2 w-2 rounded-full bg-orange-500"></span>}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{address.type}</span>
                        <span className="mt-1 block text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{address.text}</span>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="text-xs font-bold text-orange-500 hover:text-orange-600 transition"
                >
                  + Add New Address
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 dark:text-slate-400">Enter Detailed Address</label>
                  <textarea
                    rows="3"
                    value={newAddressText}
                    onChange={(e) => setNewAddressText(e.target.value)}
                    placeholder="House number, Flat, Landmark, Street name..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-55 p-3 text-xs outline-none focus:border-orange-500 dark:border-slate-800 dark:bg-slate-955 dark:text-slate-100"
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAddingAddress(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-655 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNewAddress}
                    className="rounded-xl bg-slate-850 px-4 py-2 text-xs font-bold text-white hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-855 dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3 dark:border-slate-800">
              <CreditCard className="h-5 w-5 text-orange-500" />
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Select Payment Method</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm)' },
                { id: 'CARD', label: 'Credit or Debit Card' },
                { id: 'COD', label: 'Cash on Delivery (COD)' },
                { id: 'NET', label: 'Net Banking' }
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <label
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/20 dark:border-orange-500 dark:bg-orange-950/10'
                        : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-750 dark:text-slate-300">{method.label}</span>
                    <div className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border ${
                      isSelected ? 'border-orange-500 text-orange-500' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-855 dark:bg-slate-900 shadow-sm sticky top-24 space-y-4">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 border-b border-slate-50 pb-3 dark:border-slate-800">Order Summary</h2>

            {/* Cart list */}
            <div className="max-h-52 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-2.5 flex justify-between text-xs gap-3">
                  <div className="min-w-0">
                    <span className="font-bold text-slate-750 dark:text-slate-300">{item.quantity}x </span>
                    <span className="text-slate-600 dark:text-slate-400">{item.dish.name}</span>
                    {item.selectedSize && (
                      <span className="block text-[10px] text-slate-505">{item.selectedSize.name}</span>
                    )}
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">₹{item.totalUnitPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Bill breakdown */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-750 dark:text-slate-300">₹{cartSubtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-slate-750 dark:text-slate-300">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (5%)</span>
                <span className="font-semibold text-slate-750 dark:text-slate-300">₹{tax}</span>
              </div>
              
              <div className="flex justify-between border-t border-slate-250/50 pt-3 text-sm font-extrabold text-slate-800 dark:border-slate-850 dark:text-slate-50">
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full flex justify-center items-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:opacity-95"
            >
              Confirm & Pay ₹{cartTotal}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
