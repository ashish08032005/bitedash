export const locations = [
  'Noida Sector 62',
  'Delhi Connaught Place',
  'Gurugram Phase 3',
  'Mumbai Bandra West'
];

export const categories = [
  { id: 'all', name: 'All Dishes', icon: 'Utensils' },
  { id: 'pizza', name: 'Pizza', icon: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=60' },
  { id: 'burger', name: 'Burgers', icon: 'GlassWater', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=60' },
  { id: 'sushi', name: 'Sushi', icon: 'Fish', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150&auto=format&fit=crop&q=60' },
  { id: 'healthy', name: 'Healthy', icon: 'Leaf', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&auto=format&fit=crop&q=60' },
  { id: 'desserts', name: 'Desserts', icon: 'Cake', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=150&auto=format&fit=crop&q=60' },
  { id: 'beverages', name: 'Beverages', icon: 'Coffee', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=150&auto=format&fit=crop&q=60' },
];

export const restaurants = [
  {
    id: 'r1',
    name: 'Pizzeria Bella',
    rating: 4.8,
    reviews: 1250,
    deliveryTime: '20-30',
    minOrder: 150,
    cuisine: 'Italian, Pizza, Pasta',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60',
    featured: true,
    supportedLocations: ['Noida Sector 62', 'Delhi Connaught Place']
  },
  {
    id: 'r2',
    name: 'The Burger Club',
    rating: 4.5,
    reviews: 840,
    deliveryTime: '15-25',
    minOrder: 100,
    cuisine: 'Burgers, American, Fast Food',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=60',
    featured: true,
    supportedLocations: ['Noida Sector 62', 'Gurugram Phase 3', 'Delhi Connaught Place']
  },
  {
    id: 'r3',
    name: 'Sushi Zen',
    rating: 4.9,
    reviews: 620,
    deliveryTime: '30-40',
    minOrder: 250,
    cuisine: 'Japanese, Sushi, Seafood',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&auto=format&fit=crop&q=60',
    featured: true,
    supportedLocations: ['Delhi Connaught Place', 'Mumbai Bandra West']
  },
  {
    id: 'r4',
    name: 'The Green Bowl',
    rating: 4.6,
    reviews: 450,
    deliveryTime: '15-20',
    minOrder: 120,
    cuisine: 'Salads, Healthy, Vegan',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60',
    featured: false,
    supportedLocations: ['Noida Sector 62', 'Mumbai Bandra West']
  },
  {
    id: 'r5',
    name: 'Sweet Bliss Patisserie',
    rating: 4.7,
    reviews: 310,
    deliveryTime: '25-35',
    minOrder: 80,
    cuisine: 'Desserts, Cakes, Ice Cream',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=60',
    featured: false,
    supportedLocations: ['Gurugram Phase 3', 'Mumbai Bandra West']
  },
  {
    id: 'r6',
    name: 'Caffeine Lab',
    rating: 4.4,
    reviews: 190,
    deliveryTime: '10-20',
    minOrder: 50,
    cuisine: 'Coffee, Shakes, Bakery',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=60',
    featured: false,
    supportedLocations: ['Noida Sector 62', 'Delhi Connaught Place', 'Gurugram Phase 3', 'Mumbai Bandra West']
  },
];

export const foodItems = [
  {
    id: 'f1',
    restaurantId: 'r1',
    name: 'Margherita Classica Pizza',
    description: 'Fresh mozzarella, san marzano tomatoes, fresh basil leaves, and high-quality extra virgin olive oil on a charred sourdough crust.',
    price: 349,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60',
    category: 'pizza',
    veg: true,
    isPopular: true,
    customizable: true,
    sizes: [
      { name: 'Regular (8")', priceModifier: 0 },
      { name: 'Medium (10")', priceModifier: 150 },
      { name: 'Large (12")', priceModifier: 280 }
    ],
    extras: [
      { name: 'Extra Mozzarella', price: 60 },
      { name: 'Jalapenos', price: 30 },
      { name: 'Mushrooms', price: 45 }
    ]
  },
  {
    id: 'f2',
    restaurantId: 'r1',
    name: 'Double Smokehouse Pepperoni Pizza',
    description: 'Loads of crispy, cupping pepperoni, spicy salami, crushed red pepper flakes, fresh mozzarella, and honey drizzle.',
    price: 499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60',
    category: 'pizza',
    veg: false,
    isPopular: true,
    customizable: true,
    sizes: [
      { name: 'Regular (8")', priceModifier: 0 },
      { name: 'Medium (10")', priceModifier: 180 },
      { name: 'Large (12")', priceModifier: 320 }
    ],
    extras: [
      { name: 'Extra Pepperoni', price: 90 },
      { name: 'Extra Mozzarella', price: 60 },
      { name: 'Spicy Honey Drizzle', price: 25 }
    ]
  },
  {
    id: 'f3',
    restaurantId: 'r2',
    name: 'Classic Smash Cheeseburger',
    description: 'Two smashed flame-grilled angus beef patties, double melted cheddar, house pickle chips, shredded lettuce, and special club sauce.',
    price: 249,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
    category: 'burger',
    veg: false,
    isPopular: true,
    customizable: true,
    sizes: [
      { name: 'Single Patty', priceModifier: -60 },
      { name: 'Double Patty (Standard)', priceModifier: 0 },
      { name: 'Triple Patty', priceModifier: 90 }
    ],
    extras: [
      { name: 'Crispy Bacon Strips', price: 50 },
      { name: 'Melted Cheddar Slice', price: 20 },
      { name: 'Caramelized Onions', price: 15 }
    ]
  },
  {
    id: 'f4',
    restaurantId: 'r2',
    name: 'Spicy Paneer Crunch Burger',
    description: 'Crispy batter-fried cottage cheese steak coated with hot dry rubs, creamy tandoori mayo, sliced onions, and fresh lettuce.',
    price: 199,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=500&auto=format&fit=crop&q=60',
    category: 'burger',
    veg: true,
    isPopular: false,
    customizable: true,
    sizes: [
      { name: 'Standard', priceModifier: 0 }
    ],
    extras: [
      { name: 'Cheese Slice', price: 20 },
      { name: 'Extra Spicy Mayo', price: 15 }
    ]
  },
  {
    id: 'f5',
    restaurantId: 'r3',
    name: 'Premium Salmon Avocado Roll',
    description: 'Fresh Norwegian salmon, creamy Hass avocado, cucumber, wrapped with seasoned sushi rice and rolled in toasted sesame seeds.',
    price: 549,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60',
    category: 'sushi',
    veg: false,
    isPopular: true,
    customizable: false
  },
  {
    id: 'f6',
    restaurantId: 'r3',
    name: 'Crispy Tempura Veggie Roll',
    description: 'Crispy tempura fried asparagus, sweet potato, bell peppers, topped with unagi sweet sauce and spicy vegan mayo.',
    price: 399,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500&auto=format&fit=crop&q=60',
    category: 'sushi',
    veg: true,
    isPopular: false,
    customizable: false
  },
  {
    id: 'f7',
    restaurantId: 'r4',
    name: 'Avocado Quinoa Power Salad',
    description: 'Organic red quinoa, fresh Hass avocado slices, cherry tomatoes, cucumbers, mixed greens, toasted pumpkin seeds, and a zesty lemon-tahini dressing.',
    price: 299,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
    category: 'healthy',
    veg: true,
    isPopular: true,
    customizable: true,
    sizes: [
      { name: 'Standard Bowl', priceModifier: 0 },
      { name: 'Jumbo Protein Bowl', priceModifier: 100 }
    ],
    extras: [
      { name: 'Grilled Tofu Cubes', price: 60 },
      { name: 'Extra Avocado halves', price: 50 },
      { name: 'Boiled Egg Whites', price: 30 }
    ]
  },
  {
    id: 'f8',
    restaurantId: 'r4',
    name: 'Grilled Tofu & Hummus Wrap',
    description: 'Flaxseed flatbread stuffed with marinated grilled organic tofu, house spinach hummus, shredded carrots, baby spinach, and pickled turnips.',
    price: 229,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=60',
    category: 'healthy',
    veg: true,
    isPopular: false,
    customizable: false
  },
  {
    id: 'f9',
    restaurantId: 'r5',
    name: 'Belgian Chocolate Waffle Crunch',
    description: 'Freshly baked dark cocoa waffle loaded with melted Belgian milk chocolate, white chocolate chips, and a scoop of rich vanilla bean gelato.',
    price: 219,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60',
    category: 'desserts',
    veg: true,
    isPopular: true,
    customizable: true,
    sizes: [
      { name: 'Single Waffle', priceModifier: 0 },
      { name: 'Double Stack', priceModifier: 120 }
    ],
    extras: [
      { name: 'Extra Vanilla Gelato', price: 40 },
      { name: 'Crushed Oreos & Almonds', price: 25 },
      { name: 'Warm Caramel Drizzle', price: 20 }
    ]
  },
  {
    id: 'f10',
    restaurantId: 'r5',
    name: 'Red Velvet Gourmet Cupcake',
    description: 'Moist red velvet cake with a hints of cocoa, topped with a velvety cream cheese frosting and edible gold dusting.',
    price: 119,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?w=500&auto=format&fit=crop&q=60',
    category: 'desserts',
    veg: true,
    isPopular: false,
    customizable: false
  },
  {
    id: 'f11',
    restaurantId: 'r6',
    name: 'Salted Caramel Cold Brew',
    description: '18-hour steep craft cold brew coffee infused with sweet house-made salted caramel syrup, topped with thick sweet cream cold foam.',
    price: 179,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60',
    category: 'beverages',
    veg: true,
    isPopular: true,
    customizable: true,
    sizes: [
      { name: 'Tall (350ml)', priceModifier: 0 },
      { name: 'Grande (450ml)', priceModifier: 30 },
      { name: 'Venti (600ml)', priceModifier: 50 }
    ],
    extras: [
      { name: 'Extra Espresso Shot', price: 35 },
      { name: 'Oat Milk substitute', price: 40 }
    ]
  },
  {
    id: 'f12',
    restaurantId: 'r6',
    name: 'Alfonso Mango Thickshake',
    description: 'Creamy double-churned vanilla ice cream blended with sweet fresh Alfonso mango pulp and topped with chopped mango pieces.',
    price: 199,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60',
    category: 'beverages',
    veg: true,
    isPopular: false,
    customizable: false
  }
];

export const promoCoupons = [
  { code: 'BITE20', discountPercent: 20, minOrder: 199, description: '20% Off on orders above ₹199' },
  { code: 'FLAT50', discountAmount: 50, minOrder: 299, description: '₹50 Flat Off on orders above ₹299' },
  { code: 'WELCOME100', discountAmount: 100, minOrder: 499, description: '₹100 Flat Off on orders above ₹499' }
];
