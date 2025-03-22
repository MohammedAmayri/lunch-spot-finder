
import React, { useRef, useEffect } from 'react';
import CitySearch from '../components/CitySearch';
import Header from '../components/Header';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const Index = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <AnimatedPage className="min-h-screen">
      <div className="relative min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left section - Food Image with Animation */}
          <div className="w-full lg:w-1/2 bg-brand-500 flex items-center justify-center overflow-hidden relative h-[40vh] lg:h-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 bg-brand-500 flex items-center justify-center overflow-hidden">
                <motion.img 
                  src="/lovable-uploads/4338c79c-ab06-4d40-a3b9-a6dfa95def51.png" 
                  alt="Animated food illustration" 
                  className="w-full h-full object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Right section - Content */}
          <div className="w-full lg:w-1/2 bg-white p-6 md:p-12 lg:p-16 flex flex-col justify-center">
            <div 
              ref={ref} 
              className="max-w-xl mx-auto lg:mx-0"
            >
              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-display">
                  Ha koll på den bästa lunchen!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Sveriges enklaste lunchmeny 🇸🇪
                </p>
              </motion.div>
              
              <div className="mb-8">
                <CitySearch />
              </div>
              
              <motion.div
                className="space-y-4 mt-6"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.3,
                    }
                  }
                }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.4 }
                      }
                    }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-brand-500" />
                    </div>
                    <p className="text-gray-700">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
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
