
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, X } from 'lucide-react';
import { commonCuisines } from '../data/mockData';

// Define the props interface
interface FilterBarProps {
  priceFilters: number[];
  typeFilters: string[];
  ratingFilter: number | null;
  setpriceFilters: (value: number[]) => void;
  setTypeFilters: (value: string[]) => void;
  setRatingFilter: (value: number | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  priceFilters,
  typeFilters,
  ratingFilter,
  setpriceFilters,
  setTypeFilters,
  setRatingFilter
}) => {
  const [activeTab, setActiveTab] = useState<string>('price');
  const [sliderValue, setSliderValue] = useState<number[]>([50, 200]);
  
  // Handle price filter changes
  const handlePriceChange = (value: number[]) => {
    setSliderValue(value);
  };
  
  // Apply price filter
  const applyPriceFilter = () => {
    setpriceFilters(sliderValue);
  };
  
  // Handle cuisine/type filter toggles
  const toggleTypeFilter = (cuisineName: string) => {
    if (typeFilters.includes(cuisineName)) {
      setTypeFilters(typeFilters.filter(type => type !== cuisineName));
    } else {
      setTypeFilters([...typeFilters, cuisineName]);
    }
  };
  
  // Handle rating filter
  const toggleRatingFilter = (rating: number) => {
    if (ratingFilter === rating) {
      setRatingFilter(null); // Clear filter if same rating clicked
    } else {
      setRatingFilter(rating);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setpriceFilters([]);
    setTypeFilters([]);
    setRatingFilter(null);
    setSliderValue([50, 200]);
  };
  
  // Check if any filters are active
  const hasActiveFilters = priceFilters.length > 0 || typeFilters.length > 0 || ratingFilter !== null;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="price">Price</TabsTrigger>
          <TabsTrigger value="type">Type</TabsTrigger>
          <TabsTrigger value="rating">Rating</TabsTrigger>
        </TabsList>

        <TabsContent value="price" className="px-4 py-3">
          <div className="space-y-4">
            <div className="pt-2">
              <Slider 
                defaultValue={[50, 200]} 
                min={50} 
                max={500} 
                step={10} 
                value={sliderValue}
                onValueChange={handlePriceChange}
                className="my-4" 
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{sliderValue[0]} kr</span>
                <span>{sliderValue[1]} kr</span>
              </div>
            </div>
            <Button 
              onClick={applyPriceFilter}
              variant="default" 
              className="w-full bg-brand-500 hover:bg-brand-600"
            >
              Apply
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="type" className="px-4 py-3">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {commonCuisines.map(cuisine => (
                <Button
                  key={cuisine.id}
                  variant={typeFilters.includes(cuisine.name) ? "default" : "outline"}
                  className={`text-xs px-3 py-1 h-auto ${typeFilters.includes(cuisine.name) ? 'bg-brand-500 hover:bg-brand-600' : ''}`}
                  onClick={() => toggleTypeFilter(cuisine.name)}
                >
                  {cuisine.name}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rating" className="px-4 py-3">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {[3, 3.5, 4, 4.5].map(rating => (
                <Button
                  key={rating}
                  variant={ratingFilter === rating ? "default" : "outline"}
                  className={`text-xs px-3 py-1 h-auto ${ratingFilter === rating ? 'bg-brand-500 hover:bg-brand-600' : ''}`}
                  onClick={() => toggleRatingFilter(rating)}
                >
                  {rating}+ <Star className="ml-1 h-3 w-3 fill-current" />
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {hasActiveFilters && (
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {priceFilters.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {priceFilters[0]}kr - {priceFilters[1]}kr
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer" 
                    onClick={() => setpriceFilters([])}
                  />
                </Badge>
              )}
              
              {typeFilters.map(type => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer" 
                    onClick={() => toggleTypeFilter(type)}
                  />
                </Badge>
              ))}
              
              {ratingFilter && (
                <Badge variant="secondary" className="text-xs">
                  {ratingFilter}+ <Star className="mx-1 h-3 w-3 fill-current" />
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setRatingFilter(null)}
                  />
                </Badge>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              onClick={resetFilters}
              className="text-xs h-7 px-2 text-gray-500 hover:text-gray-700"
            >
              Reset all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
