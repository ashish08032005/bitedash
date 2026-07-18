import React, { createContext, useContext, useState, useEffect } from 'react';
import { foodItems, promoCoupons, locations } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Theme State (Dark mode is default now for ultra premium feel!)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? false : true; // Default to dark mode
  });

  // Authentication States
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectUrl, setAuthRedirectUrl] = useState(null);

  // Active Selected Location
  const [currentLocation, setCurrentLocation] = useState(() => {
    const saved = localStorage.getItem('currentLocation');
    return saved || locations[0];
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Order History State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ord-9021',
        date: '2026-07-14T12:30:00.000Z',
        items: [
          {
            dish: foodItems[0],
            quantity: 2,
            selectedSize: { name: 'Medium (10")', priceModifier: 150 },
            selectedExtras: [{ name: 'Extra Mozzarella', price: 60 }],
            totalUnitPrice: 559,
          },
          {
            dish: foodItems[10],
            quantity: 1,
            selectedSize: { name: 'Grande (450ml)', priceModifier: 30 },
            selectedExtras: [],
            totalUnitPrice: 209,
          }
        ],
        subtotal: 1327,
        discount: 265,
        deliveryFee: 0,
        tax: 239,
        total: 1301,
        address: 'Flat 405, Rosewood Heights, Sector 62, Noida',
        paymentMethod: 'UPI (GPay)',
        status: 'Delivered'
      }
    ];
  });

  // Active tracking order
  const [activeOrder, setActiveOrder] = useState(null);

  // Coupon State
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Search & Navigation States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('currentLocation', currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Dark Mode side effects
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Authentication Logic
  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const loggedUser = { name: user.name, email: user.email, phone: user.phone || '+91 98765-43210' };
      setCurrentUser(loggedUser);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    
    // Default demo user fallback
    if (email === 'ashish@gmail.com' && password === '123456') {
      const demoUser = { name: 'Ashish Kumar Yadav', email: 'ashish@gmail.com', phone: '+91 98765-43210' };
      setCurrentUser(demoUser);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    
    return { success: false, message: 'Invalid credentials. Use rupal@example.com / 123456 for demo.' };
  };

  const signupUser = (name, email, password, phone = '') => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    if (users.some(u => u.email === email) || email === 'rupal@example.com') {
      return { success: false, message: 'Email already registered.' };
    }

    const newUser = { name, email, password, phone: phone || '+91 98765-43210' };
    users.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(users));
    
    setCurrentUser({ name, email, phone: newUser.phone });
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    clearCart();
    setActiveOrder(null);
  };

  // Cart Functions
  const addToCart = (dish, quantity = 1, size = null, extras = []) => {
    const sizeMod = size ? size.priceModifier : 0;
    const extrasMod = extras.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = dish.price + sizeMod + extrasMod;
    
    // Create unique key for customized item
    const customKey = `${dish.id}-${size ? size.name : 'default'}-${extras.map(e => e.name).sort().join(',')}`;

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.customKey === customKey);

      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            cartItemId: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            customKey,
            dish,
            quantity,
            selectedSize: size,
            selectedExtras: extras,
            totalUnitPrice: unitPrice,
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Coupon calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.quantity * item.totalUnitPrice, 0);
  
  const applyCouponCode = (code) => {
    const coupon = promoCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return false;
    }
    if (cartSubtotal < coupon.minOrder) {
      setCouponError(`Min order value must be ₹${coupon.minOrder}`);
      return false;
    }
    setActiveCoupon(coupon);
    setCouponError('');
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponError('');
  };

  // Re-evaluate active coupon when cart changes
  useEffect(() => {
    if (activeCoupon && cartSubtotal < activeCoupon.minOrder) {
      setActiveCoupon(null);
      setCouponError(`Coupon removed. Subtotal fell below ₹${activeCoupon.minOrder}`);
    }
  }, [cartSubtotal, activeCoupon]);

  const appliedDiscount = activeCoupon
    ? activeCoupon.discountPercent
      ? Math.round((cartSubtotal * activeCoupon.discountPercent) / 100)
      : activeCoupon.discountAmount
    : 0;

  const deliveryFee = cartSubtotal === 0 ? 0 : cartSubtotal > 399 ? 0 : 40;
  const tax = cartSubtotal === 0 ? 0 : Math.round((cartSubtotal - appliedDiscount) * 0.05); // 5% restaurant tax
  const cartTotal = cartSubtotal === 0 ? 0 : cartSubtotal - appliedDiscount + deliveryFee + tax;

  // Favorites
  const toggleFavorite = (dishId) => {
    setFavorites(prev =>
      prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  // Place Order Simulation
  const placeOrder = (address, paymentMethod) => {
    if (cart.length === 0) return null;

    const newOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: appliedDiscount,
      deliveryFee,
      tax,
      total: cartTotal,
      address,
      paymentMethod,
      status: 'Placed'
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const reorder = (pastOrder) => {
    pastOrder.items.forEach(item => {
      addToCart(item.dish, item.quantity, item.selectedSize, item.selectedExtras);
    });
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentUser,
        loginUser,
        signupUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authRedirectUrl,
        setAuthRedirectUrl,
        currentLocation,
        setCurrentLocation,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        activeCoupon,
        couponError,
        applyCouponCode,
        removeCoupon,
        appliedDiscount,
        deliveryFee,
        tax,
        cartTotal,
        favorites,
        toggleFavorite,
        orders,
        placeOrder,
        activeOrder,
        setActiveOrder,
        reorder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedRestaurant,
        setSelectedRestaurant
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
