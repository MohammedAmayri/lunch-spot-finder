
import React from 'react';
import CitySearch from '../components/CitySearch';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const Index = () => {
  return (
    <AnimatedPage>
      <div className="h-screen flex flex-col md:flex-row">
        {/* Header stays on top for all devices */}
        <Header />
        
        {/* Left side - Image section */}
        <motion.div 
          className="w-full md:w-1/2 h-[40vh] md:h-screen bg-brand-500 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/lovable-uploads/bfb87e28-0ac2-4fa2-973d-3a344bdbe2be.png')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-600/20 to-brand-600/60"></div>
          </div>
        </motion.div>
        
        {/* Right side - Content section */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <motion.div 
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-display leading-tight">
              Ha koll på den<br />bästa lunchen!
            </h1>
            <p className="text-gray-600 mb-8">
              Sveriges enklaste lunchmeny 🇸🇪
            </p>
            
            <CitySearch />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="text-brand-500 mr-3 mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

const features = [
  {
    title: "Filter by preferences",
    description: "Filtrera efter dina preferenser"
  },
  {
    title: "Browse daily menus",
    description: "Bläddra smidigt i alla menyer"
  },
  {
    title: "Save time & money",
    description: "Spara tid & pengar"
  }
];

export default Index;
