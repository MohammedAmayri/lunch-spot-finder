
import React from 'react';
import { LunchMenuItem, LunchInclude } from '../data/mockData';
import { motion } from 'framer-motion';
import { Coffee, Salad, Cake, Check } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MenuListProps {
  lunchMenuItems: LunchMenuItem[];
  lunchIncludes?: LunchInclude[];
}

// Helper to check if a tag exists
const hasTag = (tags: { name: string }[], tagName: string): boolean => {
  return tags.some(tag => tag.name.toLowerCase().includes(tagName.toLowerCase()));
};

const MenuList: React.FC<MenuListProps> = ({ lunchMenuItems, lunchIncludes = [] }) => {
  // Map of include names to icons
  const includeIcons: Record<string, React.ReactNode> = {
    'Coffee': <Coffee size={18} />,
    'Salad': <Salad size={18} />,
    'Dessert': <Cake size={18} />,
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Lunch Menu</h3>
      
      {lunchIncludes.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">Included with lunch:</span>
          {lunchIncludes.map((include) => (
            <div 
              key={include.id} 
              className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full text-sm text-green-700"
            >
              {includeIcons[include.name] || <Check size={18} />}
              <span>{include.name}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="grid gap-4 sm:grid-cols-2">
        {lunchMenuItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {item.images && item.images.length > 0 && (
              <div className="relative h-36">
                <img 
                  src={item.images[0].url} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h4 className="text-base font-semibold text-gray-900 mb-1">{item.name}</h4>
                <span className="font-bold text-brand-600">{item.price} kr</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              
              {/* Item Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              {/* Item Includes as icons */}
              <TooltipProvider>
                <div className="flex mt-3 gap-2">
                  {Object.entries(includeIcons).map(([name, icon]) => {
                    const isIncluded = hasTag(item.tags, name.toLowerCase() + " included");
                    
                    return (
                      <Tooltip key={name}>
                        <TooltipTrigger asChild>
                          <div className={cn(
                            "p-1 rounded-full", 
                            isIncluded 
                              ? "text-gray-800 bg-gray-100" 
                              : "text-gray-300"
                          )}>
                            {icon}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isIncluded 
                            ? `${name} included` 
                            : `${name} not included`}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
              
              {/* Allergens if any */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs text-gray-500">Allergens: </span>
                  <span className="text-xs text-gray-600">
                    {item.allergens.map(a => a.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
