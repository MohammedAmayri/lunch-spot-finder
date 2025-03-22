
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Restaurant } from '../data/mockData';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      <Link 
        to={`/restaurant/${restaurant.id}`} 
        className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="relative">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 to-black/40"></div>
          <div className="absolute bottom-2 left-3 flex items-center space-x-1">
            <span className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700">
              <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1" />
              {restaurant.rating.toFixed(1)}
            </span>
            <span className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700">
              <DollarSign size={12} className="text-gray-500 mr-0.5" />
              {Array(restaurant.priceLevel).fill('$').join('')}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{restaurant.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={14} className="mr-1 text-brand-400" />
            <span>{restaurant.address}, {restaurant.city}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1 text-brand-400" />
            <span>{restaurant.hours}</span>
          </div>
          
          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {restaurant.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Menu preview */}
          <div className="mt-3 border-t border-gray-100 pt-3">
            <p className="text-sm font-medium text-gray-600">Popular lunches:</p>
            <ul className="mt-1 space-y-1">
              {restaurant.menuItems.slice(0, 2).map((item, i) => (
                <li key={i} className="text-sm flex justify-between">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-medium">{item.price} kr</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
