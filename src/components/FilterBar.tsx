
import React from 'react';
import { ChevronDown, Utensils, DollarSign, Star, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FilterBarProps {
  priceFilters: number[];
  typeFilters: string[];
  ratingFilter: number | null;
  setpriceFilters: (filters: number[]) => void;
  setTypeFilters: (filters: string[]) => void;
  setRatingFilter: (rating: number | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  priceFilters,
  typeFilters,
  ratingFilter,
  setpriceFilters,
  setTypeFilters,
  setRatingFilter
}) => {
  const isMobile = useIsMobile();
  
  // Toggle price filter
  const togglePriceFilter = (level: number) => {
    if (priceFilters.includes(level)) {
      setpriceFilters(priceFilters.filter(p => p !== level));
    } else {
      setpriceFilters([...priceFilters, level]);
    }
  };
  
  // Toggle type filter
  const toggleTypeFilter = (type: string) => {
    if (typeFilters.includes(type)) {
      setTypeFilters(typeFilters.filter(t => t !== type));
    } else {
      setTypeFilters([...typeFilters, type]);
    }
  };
  
  // Toggle rating filter
  const toggleRatingFilter = (rating: number) => {
    setRatingFilter(ratingFilter === rating ? null : rating);
  };

  const filterButtons = (
    <>
      <div className="filter-button flex items-center min-w-fit">
        <Filter size={16} className="text-gray-600 mr-1.5" />
        <span>Filters</span>
      </div>
      
      {/* Price filter */}
      <button className={`filter-button min-w-fit ${priceFilters.length > 0 ? 'active' : ''}`}>
        <DollarSign size={16} className="text-gray-600" />
        <span>Price</span>
        <ChevronDown size={14} className="text-gray-500" />
        
        <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[150px] z-10">
          <div className="p-2">
            {[1, 2, 3].map(level => (
              <div 
                key={level} 
                className={`px-3 py-2 flex items-center cursor-pointer hover:bg-gray-50 rounded ${priceFilters.includes(level) ? 'text-brand-600' : ''}`}
                onClick={() => togglePriceFilter(level)}
              >
                <span>{Array(level).fill('$').join('')}</span>
              </div>
            ))}
          </div>
        </div>
      </button>
      
      {/* Food type filter */}
      <button className={`filter-button min-w-fit ${typeFilters.length > 0 ? 'active' : ''}`}>
        <Utensils size={16} className="text-gray-600" />
        <span>Food Type</span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>
      
      {/* Rating filter */}
      <button className={`filter-button min-w-fit ${ratingFilter ? 'active' : ''}`}>
        <Star size={16} className="text-gray-600" />
        <span>Rating</span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>
    </>
  );

  return (
    <div className="w-full py-2">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex gap-2 max-w-full"
      >
        {isMobile ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              <CarouselItem className="pl-2 basis-auto">
                <div className="filter-button flex items-center">
                  <Filter size={16} className="text-gray-600 mr-1.5" />
                  <span>Filters</span>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-2 basis-auto">
                <button className={`filter-button ${priceFilters.length > 0 ? 'active' : ''}`}>
                  <DollarSign size={16} className="text-gray-600" />
                  <span>Price</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
              </CarouselItem>
              
              <CarouselItem className="pl-2 basis-auto">
                <button className={`filter-button ${typeFilters.length > 0 ? 'active' : ''}`}>
                  <Utensils size={16} className="text-gray-600" />
                  <span>Food Type</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
              </CarouselItem>
              
              <CarouselItem className="pl-2 basis-auto">
                <button className={`filter-button ${ratingFilter ? 'active' : ''}`}>
                  <Star size={16} className="text-gray-600" />
                  <span>Rating</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex gap-2">
            {filterButtons}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FilterBar;
