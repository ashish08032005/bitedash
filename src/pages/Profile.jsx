import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { foodItems } from '../data/mockData';
import { downloadReceipt } from '../utils/helpers';
import { User, ClipboardList, Heart, MapPin, Phone, Mail, RotateCcw, Calendar, Download } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import FoodDetailModal from '../components/FoodDetailModal';

export default function Profile() {
  const {
    currentUser,
    orders,
    favorites,
    reorder
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();

  // Tab State query synced: 'profile', 'history', 'favorites'
  const activeTab = searchParams.get('tab') || 'history';
  const [customizingDish, setCustomizingDish] = useState(null);

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  // Filter food items that are in favorites
  const favoriteDishes = foodItems.filter(item => favorites.includes(item.id));

  const handleReorder = (order) => {
    reorder(order);
    alert('Items from past order added to your cart!');
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Logged-out profile state fallback
  if (!currentUser) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center animate-fade-in space-y-4">
        <div className="rounded-full bg-slate-100 p-5 inline-block text-slate-400 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <User className="h-10 w-10 text-orange-500" />
        </div>
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">Profile Locked</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal max-w-xs mx-auto">
          Please log in to view your details, review previous orders, and manage your favorites list.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
      
      {/* Title */}
      <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-55 sm:text-3xl mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {[
            { id: 'profile', label: 'Profile Info', icon: User },
            { id: 'history', label: 'Order History', icon: ClipboardList },
            { id: 'favorites', label: 'Favorites', icon: Heart }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-650 hover:bg-slate-55 dark:text-slate-400 dark:hover:bg-slate-900/60'
                }`}
              >
                <IconComponent className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
                {tab.id === 'favorites' && favorites.length > 0 && (
                  <span className={`ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white text-orange-500' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {favorites.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic content rendering column */}
        <div className="lg:col-span-3">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-850 dark:bg-slate-900 shadow-sm space-y-6">
              <h2 className="text-sm font-bold text-slate-850 dark:text-slate-100 border-b border-slate-50 pb-3 dark:border-slate-800">Personal Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-50 p-3 text-slate-455 dark:bg-slate-955">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wide">Full Name</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-50 p-3 text-slate-455 dark:bg-slate-955">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wide">Email Address</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-50 p-3 text-slate-455 dark:bg-slate-955">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wide">Phone Number</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.phone}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-50 pt-5 dark:border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-105">Saved Addresses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'addr-1', type: 'Home', text: 'Flat 405, Rosewood Heights, Sector 62, Noida' },
                    { id: 'addr-2', type: 'Work', text: 'Floor 12, Josh Tech Towers, Sector 135, Noida' }
                  ].map((address) => (
                    <div key={address.id} className="rounded-xl border border-slate-100 p-4 dark:border-slate-800 flex items-start gap-3 bg-slate-50/50 dark:bg-slate-950/40">
                      <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{address.type}</span>
                        <span className="block text-[11px] text-slate-505 mt-1 dark:text-slate-400 leading-normal">{address.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORDER HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center dark:border-slate-850 dark:bg-slate-900 shadow-sm">
                  <ClipboardList className="h-10 w-10 text-slate-400 mx-auto animate-pulse" />
                  <h3 className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-300">No orders placed yet</h3>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-505">Go back and order some yummy food to populate your history.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-slate-150 bg-white shadow-sm dark:border-slate-850 dark:bg-slate-900/60 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-slate-50/55 border-b border-slate-50 p-4 sm:p-5 dark:bg-slate-950/50 dark:border-slate-850 flex flex-wrap justify-between items-center gap-3 text-xs">
                      <div className="flex gap-4 items-center">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Order Date</span>
                          <span className="font-semibold text-slate-750 dark:text-slate-300 flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" /> {formatDate(order.date)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Order ID</span>
                          <span className="font-extrabold text-slate-800 dark:text-slate-200">#{order.id}</span>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-orange-500/10 text-orange-500'
                        }`}>
                          {order.status}
                        </span>
                        
                        {/* Download Receipt */}
                        <button
                          onClick={() => downloadReceipt(order, currentUser.name, currentUser.email)}
                          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-855"
                          title="Download Invoice text receipt"
                        >
                          <Download className="h-3 w-3 text-orange-550" />
                          <span>Receipt</span>
                        </button>

                        {/* Reorder */}
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-855"
                        >
                          <RotateCcw className="h-3 w-3 text-orange-500" />
                          <span>Reorder</span>
                        </button>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 sm:p-5 space-y-4">
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex justify-between items-start gap-4 text-xs">
                            <div>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{item.quantity}x </span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">{item.dish.name}</span>
                              {(item.selectedSize || item.selectedExtras?.length > 0) && (
                                <p className="text-[10px] text-slate-450 dark:text-slate-505 leading-tight mt-0.5">
                                  {item.selectedSize && `Size: ${item.selectedSize.name}`}
                                  {item.selectedSize && item.selectedExtras?.length > 0 && ' | '}
                                  {item.selectedExtras?.length > 0 && `Extras: ${item.selectedExtras.map(e => e.name).join(', ')}`}
                                </p>
                              )}
                            </div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">₹{item.totalUnitPrice * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Summary */}
                      <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:border-slate-800">
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          <span>Delivered to: </span>
                          <span className="font-bold text-slate-600 dark:text-slate-300">{order.address}</span>
                          <span className="block mt-0.5">Paid via: <span className="font-bold">{order.paymentMethod}</span></span>
                        </div>
                        <div className="text-xs text-right self-end space-y-0.5">
                          <div className="flex gap-4 justify-between">
                            <span className="text-slate-450">Subtotal:</span>
                            <span className="font-semibold text-slate-655 dark:text-slate-350">₹{order.subtotal}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex gap-4 justify-between text-emerald-600">
                              <span>Discount:</span>
                              <span>-₹{order.discount}</span>
                            </div>
                          )}
                          <div className="flex gap-4 justify-between text-sm font-extrabold text-slate-800 dark:text-slate-100">
                            <span>Paid Total:</span>
                            <span>₹{order.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* FAVORITES TAB */}
          {activeTab === 'favorites' && (
            <div>
              {favoriteDishes.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center dark:border-slate-855 dark:bg-slate-900 shadow-sm">
                  <Heart className="h-10 w-10 text-slate-455 mx-auto" />
                  <h3 className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-300">Your favorites list is empty</h3>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-505">Heart dishes from the menu to save them here for quick ordering.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {favoriteDishes.map((dish) => (
                    <FoodCard
                      key={dish.id}
                      dish={dish}
                      onCustomizeClick={(d) => setCustomizingDish(d)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Customizable Item Modal */}
      {customizingDish && (
        <FoodDetailModal
          dish={customizingDish}
          onClose={() => setCustomizingDish(null)}
        />
      )}
    </div>
  );
}
