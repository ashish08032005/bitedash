import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { foodItems, restaurants } from '../data/mockData';
import Hero from '../components/Hero';
import FilterPanel from '../components/FilterPanel';
import FoodCard from '../components/FoodCard';
import FoodDetailModal from '../components/FoodDetailModal';
import { MapPin, Utensils, Star, Smile } from 'lucide-react';

export default function Home() {
  const {
    searchQuery,
    selectedCategory,
    selectedRestaurant,
    setSelectedRestaurant,
    currentLocation
  } = useApp();

  const [vegOnly, setVegOnly] = useState(false);
  const [highRating, setHighRating] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [customizingDish, setCustomizingDish] = useState(null);

  // Filter restaurants delivering to current location
  const availableRestaurants = useMemo(() => {
    return restaurants.filter(r => r.supportedLocations.includes(currentLocation));
  }, [currentLocation]);

  // Reset restaurant filter if selected restaurant is not available in the new location
  useMemo(() => {
    if (selectedRestaurant && !availableRestaurants.some(r => r.id === selectedRestaurant.id)) {
      setSelectedRestaurant(null);
    }
  }, [availableRestaurants, selectedRestaurant]);

  // Filter and Sort dishes
  const filteredDishes = useMemo(() => {
    // 1. Only get dishes from restaurants available in the current location
    const availableRestaurantIds = availableRestaurants.map(r => r.id);
    let result = foodItems.filter(item => availableRestaurantIds.includes(item.restaurantId));

    // 2. Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // 3. Filter by Restaurant selection
    if (selectedRestaurant) {
      result = result.filter(item => item.restaurantId === selectedRestaurant.id);
    }

    // 4. Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    // 5. Filter by Veg
    if (vegOnly) {
      result = result.filter(item => item.veg);
    }

    // 6. Filter by High Rating (4.5+)
    if (highRating) {
      result = result.filter(item => item.rating >= 4.5);
    }

    // 7. Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [availableRestaurants, selectedCategory, selectedRestaurant, searchQuery, vegOnly, highRating, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 animate-fade-in">
      
      {/* Hero Banner Section */}
      <Hero />

      {/* Top Brands delivering to selected location */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                Top Brands in <span className="text-orange-500">{currentLocation.split(' ')[0]}</span>
              </h2>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Delivering fresh & hot right now</p>
            </div>
            {selectedRestaurant && (
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="text-xs font-semibold text-orange-500 hover:text-orange-600 uppercase"
              >
                Clear Brand Filter
              </button>
            )}
          </div>

          {availableRestaurants.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-900 dark:bg-slate-900/50 text-center">
              <MapPin className="h-8 w-8 text-slate-400 mx-auto" />
              <p className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">We don't deliver here yet!</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Try switching your location to Noida or Delhi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {availableRestaurants.map((restaurant) => {
                const isSelected = selectedRestaurant?.id === restaurant.id;
                return (
                  <button
                    key={restaurant.id}
                    onClick={() => setSelectedRestaurant(isSelected ? null : restaurant)}
                    className={`flex flex-col overflow-hidden rounded-2xl border p-2.5 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/20 shadow-lg shadow-orange-500/10 dark:border-orange-500 dark:bg-orange-950/10'
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md dark:border-slate-850 dark:bg-slate-900/60 dark:hover:border-slate-800'
                    }`}
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-2 min-w-0 px-1">
                      <h3 className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                        {restaurant.name}
                      </h3>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                          ★ {restaurant.rating}
                        </span>
                        <span>• {restaurant.deliveryTime}m</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Dishes Catalog */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-2 dark:border-slate-850 gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              {selectedRestaurant ? `Menu from ${selectedRestaurant.name}` : 'Explore Delicious Dishes'}
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Showing {filteredDishes.length} dishes near you
            </p>
          </div>
          
          {selectedRestaurant && (
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="self-start text-xs font-semibold bg-orange-50 text-orange-500 px-3 py-1.5 rounded-xl hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400"
            >
              Show all restaurants
            </button>
          )}
        </div>

        {/* Filters and Sorting control panels */}
        <FilterPanel
          vegOnly={vegOnly}
          setVegOnly={setVegOnly}
          highRating={highRating}
          setHighRating={setHighRating}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Grid listing */}
        {filteredDishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-slate-100 p-5 dark:bg-slate-900 text-slate-400">
              <Utensils className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-700 dark:text-slate-300">No dishes available</h3>
            <p className="mt-1 text-xs text-slate-400 max-w-xs dark:text-slate-500 leading-normal">
              Try changing your filters or changing location zone to find more culinary options.
            </p>
            <button
              onClick={() => {
                setVegOnly(false);
                setHighRating(false);
                setSortBy('popular');
                setSelectedRestaurant(null);
              }}
              className="mt-5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDishes.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                onCustomizeClick={(d) => setCustomizingDish(d)}
              />
            ))}
          </div>
        )}
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
