
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantById } from '../data/mockData';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import Map from '../components/Map';
import { MapPin, Clock, Phone, Globe, ChevronLeft, Share2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useToast } from '../hooks/use-toast';

const RestaurantDetail = () => {
  const { id = '' } = useParams<{ id: string }>();
  const restaurant = getRestaurantById(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [favorite, setFavorite] = useState(false);
  
  // Redirect to search page if restaurant not found
  useEffect(() => {
    if (!restaurant) {
      navigate('/');
    }
  }, [restaurant, navigate]);
  
  if (!restaurant) {
    return null;
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${restaurant.name} - Lunch Kompis`,
        text: `Check out ${restaurant.name} on Lunch Kompis!`,
        url: window.location.href
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share it with anyone",
      });
    }
  };
  
  const toggleFavorite = () => {
    setFavorite(!favorite);
    toast({
      title: favorite ? "Removed from favorites" : "Added to favorites",
      description: favorite ? 
        "Restaurant has been removed from your favorites" : 
        "Restaurant has been added to your favorites",
    });
  };
  
  return (
    <AnimatedPage className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-16">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={18} className="mr-1" />
            <span>Back</span>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-brand-500 hover:border-brand-300 transition-all"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={toggleFavorite}
              className={`p-2 rounded-full border transition-all ${
                favorite 
                  ? 'border-brand-300 text-brand-500 bg-brand-50' 
                  : 'border-gray-200 text-gray-600 hover:text-brand-500 hover:border-brand-300'
              }`}
              aria-label="Favorite"
            >
              <Heart size={18} className={favorite ? 'fill-brand-500' : ''} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-6">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 mb-4">{restaurant.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin size={18} className="text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{restaurant.address}, {restaurant.city}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock size={18} className="text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{restaurant.hours}</span>
                    </div>
                    {restaurant.phoneNumber && (
                      <div className="flex items-start">
                        <Phone size={18} className="text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                        <a href={`tel:${restaurant.phoneNumber}`} className="text-brand-600 hover:underline">
                          {restaurant.phoneNumber}
                        </a>
                      </div>
                    )}
                    {restaurant.website && (
                      <div className="flex items-start">
                        <Globe size={18} className="text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                        <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                          {restaurant.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="h-64 rounded-lg overflow-hidden">
                  <Map restaurants={[restaurant]} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <MenuList menuItems={restaurant.menuItems} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">At a glance</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Price range</p>
                  <p className="font-medium text-gray-900">
                    {Array(restaurant.priceLevel).fill('$').join('')}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Rating</p>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(restaurant.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">{restaurant.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Popular menu items</p>
                  <ul className="mt-1 space-y-1">
                    {restaurant.menuItems.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {restaurant.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default RestaurantDetail;
