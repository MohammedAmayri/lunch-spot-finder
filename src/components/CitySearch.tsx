
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';
import { popularCities } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const CitySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = (cityName: string) => {
    if (cityName.trim()) {
      navigate(`/search/${encodeURIComponent(cityName.trim().toLowerCase())}`);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };
  
  const filteredCities = searchTerm.trim() === '' 
    ? popularCities 
    : popularCities.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Kartområde"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full py-3 pl-12 pr-4 rounded-full bg-white 
                     shadow-soft border border-gray-100
                     focus:outline-none focus:ring-2 focus:ring-brand-200
                     transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-500"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </form>
      
      <AnimatePresence>
        {isFocused && filteredCities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">Suggestions</h3>
              <ul className="space-y-1">
                {filteredCities.map(city => (
                  <motion.li
                    key={city.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className="w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md 
                                 transition-colors duration-150 flex items-center gap-2"
                      onClick={() => {
                        setSearchTerm(city.name);
                        handleSearch(city.name);
                      }}
                    >
                      <div className="text-brand-400">
                        {searchTerm.trim() === '' ? (
                          <Star size={16} className="text-gray-400" />
                        ) : (
                          <MapPin size={16} />
                        )}
                      </div>
                      <span className="text-gray-700">{city.name}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="px-3 py-2 bg-gray-50 text-center">
              <button
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                onClick={() => {
                  setIsFocused(false);
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      () => {
                        // This would normally use the position to find nearby cities
                        // For now, just navigate to a default city
                        handleSearch("Stockholm");
                      },
                      (error) => {
                        console.error("Error getting location:", error);
                      }
                    );
                  }
                }}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <MapPin size={14} />
                  <span>Use my current location</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitySearch;
