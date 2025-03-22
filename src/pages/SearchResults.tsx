import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantsByCity } from '../data/mockData';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import RestaurantCard from '../components/RestaurantCard';
import Map from '../components/Map';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { toast } from 'sonner';
import { useIsMobile } from '../hooks/use-mobile';

const SearchResults = () => {
  const { city = '' } = useParams<{ city: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilters, setPriceFilters] = useState<number[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [mapHeight, setMapHeight] = useState('250px');
  const isMobile = useIsMobile();
  
  // Get restaurants for the given city
  const restaurants = getRestaurantsByCity(city);
  
  // Set page title
  useEffect(() => {
    document.title = `Lunch spots in ${city} | Lunch Kompis`;
  }, [city]);
  
  // Apply notification when filters change
  useEffect(() => {
    if (priceFilters.length > 0 || typeFilters.length > 0 || ratingFilter !== null) {
      toast.info('Filters applied', {
        description: 'The restaurant list has been filtered based on your criteria.'
      });
    }
  }, [priceFilters, typeFilters, ratingFilter]);
  
  // Function to filter restaurants based on search term and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Filter by search term
    if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by rating
    if (ratingFilter && restaurant.rating < ratingFilter) {
      return false;
    }
    
    // Filter by meal types (using cuisines as proxy)
    if (typeFilters.length > 0) {
      const hasMatchingType = restaurant.cuisines.some(cuisine => 
        typeFilters.includes(cuisine.name)
      );
      if (!hasMatchingType) {
        return false;
      }
    }
    
    // Filter by price range
    if (priceFilters.length === 2) {
      const minPrice = priceFilters[0];
      const maxPrice = priceFilters[1];
      
      // Check if any lunch menu item falls within the price range
      const hasItemInPriceRange = restaurant.lunchMenus.some(menu => 
        menu.lunchMenuItems.some(item => 
          item.price >= minPrice && item.price <= maxPrice
        )
      );
      
      if (!hasItemInPriceRange) {
        return false;
      }
    }
    
    return true;
  });

  // Scroll to restaurant when selected from map
  useEffect(() => {
    if (selectedRestaurant) {
      const restaurantElement = document.getElementById(`restaurant-${selectedRestaurant.id}`);
      if (restaurantElement) {
        restaurantElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedRestaurant]);
  
  return (
    <AnimatedPage className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-8 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-brand-500" size={20} />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                {city}
              </h1>
            </div>
            
            <div className="mb-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="flex items-center justify-between">
                <FilterBar
                  priceFilters={priceFilters}
                  typeFilters={typeFilters}
                  ratingFilter={ratingFilter}
                  setpriceFilters={setPriceFilters}
                  setTypeFilters={setTypeFilters}
                  setRatingFilter={setRatingFilter}
                />
                
                {isMobile && (
                  <button 
                    onClick={() => setMapHeight(mapHeight === '250px' ? '400px' : '250px')}
                    className="filter-button"
                  >
                    <SlidersHorizontal size={16} />
                    <span>{mapHeight === '250px' ? 'Expand Map' : 'Collapse Map'}</span>
                  </button>
                )}
              </div>
            </div>
            
            {isMobile && (
              <div className="mb-6 h-auto overflow-hidden">
                <div style={{ height: mapHeight, transition: 'height 0.3s ease' }}>
                  <Map 
                    restaurants={filteredRestaurants}
                    selectedRestaurant={selectedRestaurant}
                    setSelectedRestaurant={setSelectedRestaurant}
                  />
                </div>
              </div>
            )}
            
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600 font-medium">
                {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center text-sm">
                <span className="text-gray-500 mr-2">Sort by:</span>
                <select className="bg-white border border-gray-200 rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-300">
                  <option>Recommended</option>
                  <option>Price: Low to high</option>
                  <option>Price: High to low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRestaurants.map((restaurant, index) => (
                <div 
                  key={restaurant.id} 
                  id={`restaurant-${restaurant.id}`}
                  className={`${selectedRestaurant?.id === restaurant.id ? 'ring-2 ring-brand-500 rounded-xl' : ''}`}
                >
                  <RestaurantCard 
                    restaurant={restaurant} 
                    index={index}
                  />
                </div>
              ))}
              
              {filteredRestaurants.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No restaurants found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search term</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden md:block w-full md:w-1/2 lg:w-2/5 sticky top-20 h-[calc(100vh-8rem)]">
            <Map 
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
              setSelectedRestaurant={setSelectedRestaurant}
            />
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default SearchResults;
