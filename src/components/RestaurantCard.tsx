
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Coffee, Salad, Sandwich, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Restaurant, LunchMenuItem, Tag } from '../data/mockData';
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
import { useState } from "react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

// Helper to check if an item includes extras based on tags
const hasExtra = (tags: Tag[], extraType: string): boolean => {
  const extraMap: Record<string, string[]> = {
    'coffee': ['Coffee included', 'Free coffee', 'Includes coffee'],
    'salad': ['Salad included', 'Salad bar', 'Includes salad'],
    'dessert': ['Dessert included', 'Includes dessert', 'Sweet']
  };
  
  return tags.some(tag => extraMap[extraType]?.includes(tag.name));
};

// Random food placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
];

// Get a random image from the placeholders array
const getRandomPlaceholderImage = () => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

// Helper to remove day prefix from menu names
const removeDayPrefix = (name: string): string => {
  const dayPattern = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday): /i;
  return name.replace(dayPattern, '');
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, index }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get lunch menu items from the restaurant's first lunch menu
  const lunchMenuItems = restaurant.lunchMenus[0]?.lunchMenuItems || [];
  const totalSlides = lunchMenuItems.length;
  
  // Get location data
  const address = restaurant.location?.address || '';
  const city = restaurant.location?.city || '';
  
  // Get hours string representation
  const hoursText = restaurant.hours.length > 0 ? 
    `${restaurant.hours[0].startTime} - ${restaurant.hours[0].endTime}` : 
    'Hours not available';
  
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
              <span>{address}, {city}</span>
            </div>
          </div>
          <a 
            href={`https://maps.google.com/?q=${address},${city}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center"
          >
            <MapPin size={16} className="mr-1" />
            Karta
          </a>
        </div>
        
        {/* Menu Carousel */}
        <div className="relative">
          {/* Carousel Title */}
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-medium text-gray-700">
              Today's Lunch Menu ({currentSlide + 1}/{totalSlides})
            </h4>
            
            {/* Slide Indicators */}
            <div className="flex gap-1">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full transition-all ${i === currentSlide ? 'bg-brand-500 w-4' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
          
          <Carousel
            opts={{ loop: true }}
            className="w-full"
            onSelect={(api) => {
              if (api) {
                // Fix: Use the carousel API correctly
                setCurrentSlide(api.selectedScrollSnap());
              }
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {lunchMenuItems.map((item: LunchMenuItem, i: number) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full md:basis-1/1 lg:basis-1/1">
                  <div className="bg-gray-50 rounded-xl overflow-hidden relative">
                    <div className="relative h-64 w-full">
                      <img 
                        src={(item.images && item.images.length > 0) ? item.images[0].url : getRandomPlaceholderImage()} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <h4 
                            className="text-2xl font-bold text-gray-900 truncate max-w-[70%]" 
                            title={removeDayPrefix(item.name)}
                          >
                            {removeDayPrefix(item.name)}
                          </h4>
                          <span className="text-xl font-bold text-gray-900">{Number(item.price)} kr</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          {/* Opening Hours */}
                          <div className="text-base text-gray-600">
                            {hoursText}
                          </div>
                          
                          {/* Included Items */}
                          <div className="flex items-center space-x-4">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className={cn(
                                    "p-1.5", 
                                    hasExtra(item.tags, 'coffee') 
                                      ? "text-gray-800" 
                                      : "text-gray-300"
                                  )}>
                                    <Coffee size={24} />
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
                                    "p-1.5", 
                                    hasExtra(item.tags, 'salad') 
                                      ? "text-gray-800" 
                                      : "text-gray-300"
                                  )}>
                                    <Salad size={24} />
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
                                    "p-1.5", 
                                    hasExtra(item.tags, 'dessert') 
                                      ? "text-gray-800" 
                                      : "text-gray-300"
                                  )}>
                                    <Sandwich size={24} className="rotate-45" />
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
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="sm:block mt-2">
              <CarouselPrevious className="-left-3 h-8 w-8" />
              <CarouselNext className="-right-3 h-8 w-8" />
            </div>
          </Carousel>
        </div>
        
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
