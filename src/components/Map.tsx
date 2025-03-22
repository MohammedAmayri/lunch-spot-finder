
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Restaurant } from '../data/mockData';
import { MapPin } from 'lucide-react';

interface MapProps {
  restaurants: Restaurant[];
  selectedRestaurant?: Restaurant | null;
  setSelectedRestaurant?: (restaurant: Restaurant | null) => void;
}

// The token might not be valid, so we'll allow the user to provide their own
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbHRsOWc2dWowYmxtMmpzNmZ6OWNxdDNnIn0._j-Qu9kLNEifsZP4CF90mw';

const Map: React.FC<MapProps> = ({ 
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tokenInputValue, setTokenInputValue] = useState(MAPBOX_TOKEN);
  const [customToken, setCustomToken] = useState<string | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Function to initialize the map
  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;
    
    // Clear previous map if it exists
    if (map.current) {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current.remove();
    }

    try {
      // Initialize map with token
      mapboxgl.accessToken = token;
      
      // Create the map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setMapLoaded(true);
        setMapError(null);
      });
      
      // Better error handling
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Error loading map: ' + (e.error?.message || 'Unknown error'));
        setShowTokenInput(true);
      });
      
      // If there are no restaurants, center on Sweden
      if (restaurants.length === 0) {
        map.current.setCenter([18.0686, 59.3293]); // Stockholm coordinates
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please provide a valid Mapbox token.');
      setShowTokenInput(true);
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    const token = customToken || MAPBOX_TOKEN;
    initializeMap(token);
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        map.current.remove();
      }
    };
  }, [customToken]);

  // Update markers when restaurants or selectedRestaurant changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    if (restaurants.length === 0) return;
    
    // Calculate bounds to fit all restaurants
    const bounds = new mapboxgl.LngLatBounds();
    
    // Add new markers for each restaurant
    restaurants.forEach(restaurant => {
      if (!restaurant.location?.coordinates) return;
      
      const { lng, lat } = restaurant.location.coordinates;
      
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="${selectedRestaurant?.id === restaurant.id 
          ? 'bg-brand-500 text-white' 
          : 'bg-white text-gray-700 border border-gray-200'} 
          p-2 rounded-full shadow-md cursor-pointer transform transition-all duration-200 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;
      
      // Add click handler to marker
      markerElement.addEventListener('click', () => {
        setSelectedRestaurant?.(
          selectedRestaurant?.id === restaurant.id ? null : restaurant
        );
      });
      
      // Create and add marker to map
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([lng, lat])
        .addTo(map.current!);
      
      // Create popup with restaurant info
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${restaurant.name}</h3>
            <p class="text-sm">${restaurant.location.address || ''}</p>
          </div>
        `);
      
      // Show popup on hover
      markerElement.addEventListener('mouseenter', () => {
        marker.setPopup(popup);
        marker.togglePopup();
      });
      
      markerElement.addEventListener('mouseleave', () => {
        marker.togglePopup();
      });
      
      // Store marker reference for cleanup
      markers.current.push(marker);
      
      // Extend bounds to include this location
      bounds.extend([lng, lat]);
    });
    
    // Fit map to show all markers
    if (!bounds.isEmpty()) {
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
    
    // If a restaurant is selected, center on it
    if (selectedRestaurant?.location?.coordinates) {
      const { lng, lat } = selectedRestaurant.location.coordinates;
      map.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        essential: true
      });
    }
    
  }, [restaurants, selectedRestaurant, mapLoaded]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomToken(tokenInputValue);
    setShowTokenInput(false);
  };

  return (
    <div className="relative w-full h-full min-h-[250px]">
      {showTokenInput ? (
        <div className="absolute inset-0 bg-gray-50 p-4 flex flex-col items-center justify-center text-center z-10 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Map Access Token Required</h3>
          {mapError && <p className="text-red-500 text-sm mb-2">{mapError}</p>}
          <p className="text-sm text-gray-600 mb-4">
            Enter your Mapbox public token to display the map. 
            Get one at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-brand-500 underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-2">
            <input
              type="text"
              value={tokenInputValue}
              onChange={(e) => setTokenInputValue(e.target.value)}
              placeholder="pk.eyJ1Ijo..."
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button 
              type="submit" 
              className="w-full bg-brand-500 text-white p-2 rounded hover:bg-brand-600 transition-colors"
            >
              Apply Token
            </button>
          </form>
        </div>
      ) : null}
      
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      {/* Fallback for restaurant list if map fails to load */}
      {(!mapLoaded && !showTokenInput) && (
        <div className="absolute inset-0 bg-brand-50 flex flex-col items-center justify-center text-center z-10 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Loading map...</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {restaurants.map(restaurant => (
              <div 
                key={restaurant.id}
                className={`
                  px-3 py-2 rounded-full text-sm flex items-center gap-1.5 cursor-pointer 
                  transition-all duration-200 border
                  ${selectedRestaurant?.id === restaurant.id 
                    ? 'bg-brand-500 text-white border-brand-500' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-brand-200'}
                `}
                onClick={() => setSelectedRestaurant?.(
                  selectedRestaurant?.id === restaurant.id ? null : restaurant
                )}
              >
                <MapPin size={14} />
                <span>{restaurant.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
