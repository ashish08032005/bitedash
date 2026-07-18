import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
          
          {/* Global Sticky Navbar */}
          <Navbar onCartOpen={() => setCartOpen(true)} />

          {/* Cart Sliding Drawer Overlay */}
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

          {/* Auth Modal Overlay */}
          <AuthModal />

          {/* Routing Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          {/* Premium Footer */}
          <footer className="border-t border-slate-200/60 bg-white py-8 transition-colors duration-300 dark:border-slate-900 dark:bg-slate-950 text-xs">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-700 dark:text-slate-250">BiteDash</span>
                <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-orange-500 transition">Terms of Service</a>
                <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
                <a href="#" className="hover:text-orange-500 transition">Support Chat</a>
              </div>
            </div>
          </footer>

        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
