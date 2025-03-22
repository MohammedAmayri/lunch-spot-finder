
import React from 'react';
import { MenuItem } from '../data/mockData';
import { motion } from 'framer-motion';

interface MenuListProps {
  menuItems: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ menuItems }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Lunch Menu</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {menuItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {item.image && (
              <div className="relative h-36">
                <img 
                  src={item.image} 
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
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
