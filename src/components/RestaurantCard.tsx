
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Coffee, Salad, Sandwich, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Restaurant } from '../data/mockData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

// Helper to check if an item includes extras based on tags
const hasExtra = (tags: string[], extraType: string): boolean => {
  const extraMap: Record<string, string[]> = {
    'coffee': ['Coffee included', 'Free coffee', 'Includes coffee'],
    'salad': ['Salad included', 'Salad bar', 'Includes salad'],
    'dessert': ['Dessert included', 'Includes dessert', 'Sweet']
  };
  
  return tags.some(tag => extraMap[extraType]?.includes(tag));
};

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
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="p-4">
        {/* Restaurant Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin size={14} className="mr-1 text-gray-400" />
              <span>{restaurant.address}, {restaurant.city}</span>
            </div>
          </div>
          <a 
            href={`https://maps.google.com/?q=${restaurant.address},${restaurant.city}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center"
          >
            <MapPin size={16} className="mr-1" />
            Karta
          </a>
        </div>
        
        {/* Menu Carousel */}
        <Carousel
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {restaurant.menuItems.map((item, i) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  {item.image && (
                    <div className="relative h-48">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                      <span className="font-bold text-gray-900">{item.price} kr</span>
                    </div>
                    
                    {/* Opening Hours */}
                    <div className="text-sm text-gray-500 mb-3">
                      {restaurant.hours}
                    </div>
                    
                    {/* Included Items */}
                    <div className="flex items-center space-x-3 mt-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={cn(
                              "p-1.5 rounded-full", 
                              hasExtra(item.tags, 'coffee') 
                                ? "text-gray-700" 
                                : "text-gray-300"
                            )}>
                              <Coffee size={20} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{hasExtra(item.tags, 'coffee') 
                              ? "Coffee included" 
                              : "Coffee not included"}</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={cn(
                              "p-1.5 rounded-full", 
                              hasExtra(item.tags, 'salad') 
                                ? "text-gray-700" 
                                : "text-gray-300"
                            )}>
                              <Salad size={20} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{hasExtra(item.tags, 'salad') 
                              ? "Salad included" 
                              : "Salad not included"}</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={cn(
                              "p-1.5 rounded-full", 
                              hasExtra(item.tags, 'dessert') 
                                ? "text-gray-700" 
                                : "text-gray-300"
                            )}>
                              <Sandwich size={20} className="rotate-45" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{hasExtra(item.tags, 'dessert') 
                              ? "Dessert included" 
                              : "Dessert not included"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </div>
        </Carousel>
        
        {/* Link to Restaurant Detail */}
        <Link 
          to={`/restaurant/${restaurant.id}`}
          className="mt-4 text-sm text-brand-600 font-medium flex items-center hover:underline"
        >
          <span>View details</span>
          <ExternalLink size={14} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
