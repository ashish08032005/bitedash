import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { locations } from '../data/mockData';
import { ShoppingBag, Heart, User, Sun, Moon, Search, Utensils, Menu, X, MapPin, LogOut } from 'lucide-react';

export default function Navbar({ onCartOpen }) {
  const {
    isDarkMode,
    toggleDarkMode,
    cart,
    searchQuery,
    setSearchQuery,
    favorites,
    currentUser,
    logoutUser,
    setIsAuthModalOpen,
    currentLocation,
    setCurrentLocation
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-850 dark:bg-slate-950/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Location group */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-orange-500 hover:opacity-90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20">
                <Utensils className="h-5 w-5" />
              </div>
              <span className="hidden text-xl font-bold tracking-tight text-slate-800 dark:text-slate-50 sm:block">
                Bite<span className="text-orange-500">Dash</span>
              </span>
            </Link>

            {/* Location Selector */}
            <div className="relative flex items-center gap-1 text-xs">
              <MapPin className="h-4.5 w-4.5 text-orange-500 animate-bounce-slow" />
              <select
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="bg-transparent border-0 font-bold text-slate-700 dark:text-slate-300 pr-4 outline-none cursor-pointer hover:text-orange-500 focus:ring-0 max-w-[130px] sm:max-w-[200px] truncate"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="dark:bg-slate-900 dark:text-slate-300">
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs md:max-w-md hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-700 dark:focus:border-orange-500 dark:focus:bg-slate-900"
            />
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden items-center gap-2 sm:flex">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Favorites Link */}
            <Link
              to="/profile?tab=favorites"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-rose-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-rose-400"
              title="Favorites"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Logged-in profile or Login CTA */}
            {currentUser ? (
              <div className="flex items-center gap-1">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 border border-slate-200 bg-white rounded-xl px-3 py-1.5 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                  title="My Profile"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden md:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-rose-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                  title="Logout"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold text-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-orange-400 dark:hover:bg-orange-500 dark:hover:text-white transition"
              >
                Sign In
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={onCartOpen}
              className="relative flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:opacity-95 active:scale-95 transition"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Cart</span>
              {totalCartItems > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-orange-600 animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Cart Trigger (Mobile) */}
            <button
              onClick={onCartOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20 active:scale-95"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-orange-500 ring-2 ring-orange-500">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 sm:hidden">
          <div className="flex flex-col gap-3">
            
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs outline-none focus:border-orange-500 dark:border-slate-850 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <Utensils className="h-4.5 w-4.5 text-orange-500" />
              <span>Browse Dishes</span>
            </Link>
            <Link
              to="/profile?tab=favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <Heart className="h-4.5 w-4.5 text-orange-500" />
              <span>Favorites ({favorites.length})</span>
            </Link>
            
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <User className="h-4.5 w-4.5 text-orange-500" />
                  <span>My Profile ({currentUser.name})</span>
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <LogOut className="h-4.5 w-4.5 text-orange-500" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                <User className="h-4.5 w-4.5 text-orange-500" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={() => {
                toggleDarkMode();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4.5 w-4.5 text-orange-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4.5 w-4.5 text-orange-500" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
