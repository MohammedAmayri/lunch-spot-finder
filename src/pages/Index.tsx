
import React from 'react';
import CitySearch from '../components/CitySearch';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const Index = () => {
  return (
    <AnimatedPage className="min-h-screen">
      <div className="relative min-h-screen bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        
        <Header />
        
        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Find the perfect lunch spot
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
              Discover the best lunch options in your city, with menus, prices, and ratings.
            </p>
            
            <CitySearch />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 rounded-lg text-white"
              >
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-brand-500/20 p-2 mr-3">
                    <Check className="h-5 w-5 text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

const features = [
  {
    title: "Filter by preferences",
    description: "Find restaurants that match your dietary needs and price range."
  },
  {
    title: "Browse daily menus",
    description: "See what's on the menu today at restaurants near you."
  },
  {
    title: "Save time & money",
    description: "Compare prices and options to make the best lunch decision."
  }
];

export default Index;
