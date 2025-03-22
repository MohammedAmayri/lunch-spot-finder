
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Restaurant } from '../data/mockData';
import { useCarousel } from 'embla-carousel-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(restaurant.lunchMenus[0]?.id || '');
  
  // Helper function to format price range
  const formatPriceRange = () => {
    let min = Infinity;
    let max = 0;
    
    restaurant.lunchMenus.forEach(menu => {
      menu.lunchMenuItems.forEach(item => {
        if (item.price < min) min = item.price;
        if (item.price > max) max = item.price;
      });
    });
    
    return `${min !== Infinity ? min : 0} - ${max} kr`;
  };
  
  // Extract restaurant details
  const { id, name, rating, cuisines, location, hours, lunchMenus, images } = restaurant;
  
  // Get current lunch hours if available
  const lunchHours = hours.find(h => h.type === "LUNCH");
  
  // Get main image and all item images
  const mainImage = images[0]?.url || '/placeholder.svg';
  
  // Collect all menu item images
  const allImages = [mainImage];
  lunchMenus.forEach(menu => {
    menu.lunchMenuItems.forEach(item => {
      if (item.images && item.images.length > 0) {
        allImages.push(item.images[0].url);
      }
    });
  });
  
  // Limit to 5 images max
  const cardImages = allImages.slice(0, 5);
  
  // Helper to get lunch includes as string
  const getLunchIncludes = (menuId: string) => {
    const menu = lunchMenus.find(m => m.id === menuId);
    if (!menu) return '';
    
    return menu.lunchIncludes.map(item => item.name).join(', ');
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: index * 0.1,
      }
    }
  };
  
  const handleCarouselChange = useCallback((api: any) => {
    if (!api) return;
    const scrollSnap = api.selectedScrollSnap();
    setCurrentImageIndex(scrollSnap);
  }, []);
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col"
    >
      <div className="relative">
        <Carousel className="w-full" onApiChange={handleCarouselChange}>
          <CarouselContent>
            {cardImages.map((image, i) => (
              <CarouselItem key={i}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-8 w-8 left-2" />
          <CarouselNext className="h-8 w-8 right-2" />
        </Carousel>
        
        {cardImages.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {cardImages.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${
                  currentImageIndex === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                } transition-all duration-300 ease-in-out`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center px-2 py-1 bg-green-50 rounded-full">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-xs font-medium text-gray-900">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {cuisines.map((cuisine, i) => (
            <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {cuisine.name}
            </span>
          ))}
        </div>
        
        {location && (
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span className="truncate">{location.address}</span>
          </div>
        )}
        
        {lunchHours && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span>{lunchHours.startTime} - {lunchHours.endTime}</span>
          </div>
        )}
        
        {lunchMenus.length > 0 && (
          <div className="mt-auto space-y-4">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Price range:</span> {formatPriceRange()}
            </div>
            
            <Tabs 
              defaultValue={activeMenu} 
              onValueChange={setActiveMenu}
              className="w-full"
            >
              {lunchMenus.length > 1 && (
                <div className="flex items-center mb-3">
                  <Menu className="h-4 w-4 mr-1 text-brand-500" />
                  <span className="text-sm font-medium text-gray-700">Available Menus:</span>
                </div>
              )}
              
              {lunchMenus.length > 1 && (
                <TabsList className="grid w-full grid-cols-2 h-auto mb-3">
                  {lunchMenus.map(menu => (
                    <TabsTrigger 
                      key={menu.id} 
                      value={menu.id}
                      className="text-xs py-1 px-2"
                    >
                      {menu.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}
              
              {lunchMenus.map(menu => (
                <TabsContent key={menu.id} value={menu.id} className="space-y-3 mt-0">
                  {getLunchIncludes(menu.id) && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Includes:</span> {getLunchIncludes(menu.id)}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">Popular dishes:</div>
                    {menu.lunchMenuItems.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <span className="font-medium text-gray-700">{item.name}</span>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.tags.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-[10px] px-1 py-0 h-4">
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-gray-500 ml-2">{item.price} kr</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
        
        <Link
          to={`/restaurant/${id}`}
          className="mt-4 flex items-center justify-center py-2 px-4 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors"
        >
          View menu <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
