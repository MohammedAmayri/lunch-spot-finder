
import React from 'react';
import CitySearch from '../components/CitySearch';
import Header from '../components/Header';
import { Check } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const Index = () => {
  return (
    <AnimatedPage className="min-h-screen">
      <div className="relative min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Left section - Green background with food image */}
          <div className="w-full md:w-1/2 bg-brand-500 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-brand-800 flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/d7cf2e90-c60b-45f7-a628-395aa45bbdea.png" 
                alt="Drink illustration" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          
          {/* Right section - White background with content */}
          <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
            <div className="max-w-xl mx-auto md:mx-0 pt-8 md:pt-16">
              <div className="mt-4 mb-8">
                <CitySearch />
              </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Ha koll på den bästa lunchen!
                </h1>
                <p className="text-base text-gray-600 mb-6 flex items-center">
                  Sveriges enklaste lunchmeny 
                  <span className="ml-1">🇸🇪</span>
                </p>
              </div>
              
              <div className="space-y-4 mt-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-brand-500" />
                    </div>
                    <p className="text-gray-800">{feature.description}</p>
                  </div>
                ))}
              </div>
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
