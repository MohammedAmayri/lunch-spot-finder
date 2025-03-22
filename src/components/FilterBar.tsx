import React, { useState } from 'react';
import { ChevronDown, Utensils, DollarSign, Star, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Checkbox } from '@/components/ui/checkbox';
import Carousel from '@/components/ui/carousel';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Slider
} from "@/components/ui/slider";
import { commonCuisines } from '@/data/mockData';

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
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleApplyPriceRange = () => {
    setpriceFilters([priceRange[0], priceRange[1]]);
  };
  
  const toggleTypeFilter = (type: string) => {
    if (typeFilters.includes(type)) {
      setTypeFilters(typeFilters.filter(t => t !== type));
    } else {
      setTypeFilters([...typeFilters, type]);
    }
  };
  
  const toggleRatingFilter = (rating: number) => {
    setRatingFilter(ratingFilter === rating ? null : rating);
  };

  const cuisineOptions = commonCuisines.map(cuisine => cuisine.name);

  const PriceFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`filter-button ${priceFilters.length > 0 ? 'active' : ''}`}>
          <DollarSign size={16} className="text-gray-600" />
          <span>Price</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Price Range</h4>
            {priceFilters.length > 0 && (
              <button 
                onClick={() => setpriceFilters([])}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
              >
                <X size={12} className="mr-1" />
                Clear
              </button>
            )}
          </div>
          
          <div className="pt-4">
            <Slider
              defaultValue={[50, 500]}
              value={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={handlePriceRangeChange}
              className="my-6"
            />
            
            <div className="flex justify-between mt-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 text-sm">SEK</span>
                </div>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="pl-12 pr-3 py-2 border border-gray-300 rounded text-sm w-24"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 text-sm">SEK</span>
                </div>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                  className="pl-12 pr-3 py-2 border border-gray-300 rounded text-sm w-24"
                />
              </div>
            </div>
            
            <button
              onClick={handleApplyPriceRange}
              className="w-full mt-4 bg-brand-500 text-white rounded-lg py-2 font-medium hover:bg-brand-600 transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const FoodTypeFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`filter-button ${typeFilters.length > 0 ? 'active' : ''}`}>
          <Utensils size={16} className="text-gray-600" />
          <span>Food Type</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 max-h-[70vh] overflow-auto">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Cuisine Types</h4>
            {typeFilters.length > 0 && (
              <button 
                onClick={() => setTypeFilters([])}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
              >
                <X size={12} className="mr-1" />
                Clear
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {cuisineOptions.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cuisine-${cuisine}`} 
                  checked={typeFilters.includes(cuisine)}
                  onCheckedChange={() => toggleTypeFilter(cuisine)}
                />
                <label 
                  htmlFor={`cuisine-${cuisine}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {cuisine}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const RatingFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`filter-button ${ratingFilter ? 'active' : ''}`}>
          <Star size={16} className="text-gray-600" />
          <span>Rating</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Minimum Rating</h4>
            {ratingFilter && (
              <button 
                onClick={() => setRatingFilter(null)}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
              >
                <X size={12} className="mr-1" />
                Clear
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {[4, 3, 2].map((rating) => (
              <div 
                key={rating}
                className={`flex items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-50 ${ratingFilter === rating ? 'bg-brand-50 text-brand-600' : ''}`}
                onClick={() => toggleRatingFilter(rating)}
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} mr-0.5`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">{rating}+ stars</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const filterButtons = (
    <>
      <div className="filter-button flex items-center min-w-fit">
        <Filter size={16} className="text-gray-600 mr-1.5" />
        <span>Filters</span>
      </div>
      
      <PriceFilter />
      <FoodTypeFilter />
      <RatingFilter />
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
          <div className="w-full">
            <Carousel
              slides={[
                { id: 1, src: '', alt: 'filters' },
                { id: 2, src: '', alt: 'price' },
                { id: 3, src: '', alt: 'food-type' },
                { id: 4, src: '', alt: 'rating' }
              ]}
              options={{ loop: false }}
            />
            <CarouselContent className="-ml-2">
              <CarouselItem className="pl-2 basis-auto">
                <div className="filter-button flex items-center">
                  <Filter size={16} className="text-gray-600 mr-1.5" />
                  <span>Filters</span>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-2 basis-auto">
                <PriceFilter />
              </CarouselItem>
              
              <CarouselItem className="pl-2 basis-auto">
                <FoodTypeFilter />
              </CarouselItem>
              
              <CarouselItem className="pl-2 basis-auto">
                <RatingFilter />
              </CarouselItem>
            </CarouselContent>
          </div>
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
