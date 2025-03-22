
import React from 'react';
import { Restaurant } from '../data/mockData';
import { MapPin } from 'lucide-react';

interface MapProps {
  restaurants: Restaurant[];
  selectedRestaurant?: Restaurant | null;
  setSelectedRestaurant?: (restaurant: Restaurant | null) => void;
}

const Map: React.FC<MapProps> = ({ 
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant 
}) => {
  return (
    <div className="relative w-full h-full min-h-[250px] bg-brand-50 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-brand-50 flex flex-col items-center justify-center text-center">
        <div className="p-4 text-gray-600">
          <p className="text-sm">
            Map component - In a real application, this would be an interactive map
            displaying restaurant locations
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {restaurants.map(restaurant => (
              <div 
                key={restaurant.id}
                className={`
                  px-3 py-2 rounded-full text-sm flex items-center gap-1.5 cursor-pointer 
                  transition-all duration-200 border
                  ${selectedRestaurant?.id === restaurant.id 
                    ? 'bg-brand-500 text-white border-brand-500' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-brand-200'}
                `}
                onClick={() => setSelectedRestaurant?.(
                  selectedRestaurant?.id === restaurant.id ? null : restaurant
                )}
              >
                <MapPin size={14} />
                <span>{restaurant.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
