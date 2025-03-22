
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
        
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Left section - Food Image with Animation */}
          <div className="w-full md:w-1/2 bg-brand-600 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-brand-600 flex items-center justify-center overflow-hidden">
              <motion.img 
                src="/lovable-uploads/5c46715a-4436-49a6-a8aa-396315e57e17.png" 
                alt="Animated food illustration" 
                className="w-full h-full object-cover object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
          
          {/* Right section - Content */}
          <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-start">
            <div ref={ref} className="max-w-xl mx-auto md:mx-0 pt-8 md:pt-16">
              <div className="mt-4 mb-8">
                <CitySearch />
              </div>
              
              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Ha koll på den bästa lunchen!
                </h1>
                <p className="text-base text-gray-600 mb-6 flex items-center">
                  Sveriges enklaste lunchmeny 
                  <span className="ml-1">🇸🇪</span>
                </p>
              </motion.div>
              
              <motion.div
                className="space-y-4 mt-8"
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
                    className="flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-brand-500" />
                    </div>
                    <p className="text-gray-800">{feature.description}</p>
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
