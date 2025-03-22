
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant } from '../data/mockData';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapProps {
  restaurants: Restaurant[];
  selectedRestaurant?: Restaurant | null;
  setSelectedRestaurant?: (restaurant: Restaurant | null) => void;
}

const Map: React.FC<MapProps> = ({ 
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Function to initialize the map
  const initializeMap = () => {
    if (!mapContainer.current) return;
    
    // Clear previous markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Only remove the map if it exists
    if (map.current) {
      try {
        map.current.remove();
      } catch (err) {
        console.error('Error removing map:', err);
      }
      map.current = null;
    }

    try {
      // Create the map instance
      map.current = L.map(mapContainer.current, {
        center: [59.3293, 18.0686], // Stockholm coordinates by default
        zoom: 12,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })
        ]
      });

      // Add zoom control
      L.control.zoom({ position: 'topright' }).addTo(map.current);
      
      setMapLoaded(true);
      setMapError(null);
      
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map');
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    initializeMap();
    
    // Clean up on unmount
    return () => {
      // Clear markers first
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      // Safely remove map
      if (map.current) {
        try {
          map.current.remove();
        } catch (err) {
          console.error('Error removing map during cleanup:', err);
        }
        map.current = null;
      }
    };
  }, []);

  // Update markers when restaurants or selectedRestaurant changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    if (restaurants.length === 0) return;
    
    // Prepare bounds to fit all markers
    const bounds = L.latLngBounds([]);
    
    // Add new markers for each restaurant
    restaurants.forEach(restaurant => {
      if (!restaurant.location?.coordinates) return;
      
      const { lat, lng } = restaurant.location.coordinates;
      
      // Create custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: `
          <div class="${selectedRestaurant?.id === restaurant.id 
            ? 'bg-brand-500 text-white' 
            : 'bg-white text-gray-700 border border-gray-200'} 
            p-2 rounded-full shadow-md cursor-pointer transform transition-all duration-200 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });
      
      // Create and add marker to map
      const marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(map.current!);
      
      // Add click handler
      marker.on('click', () => {
        setSelectedRestaurant?.(
          selectedRestaurant?.id === restaurant.id ? null : restaurant
        );
      });
      
      // Create popup with restaurant info
      const popup = L.popup({
        closeButton: false,
        offset: [0, -15]
      }).setContent(`
        <div class="p-2">
          <h3 class="font-bold">${restaurant.name}</h3>
          <p class="text-sm">${restaurant.location.address || ''}</p>
        </div>
      `);
      
      // Show popup on hover
      marker.on('mouseover', () => {
        marker.bindPopup(popup).openPopup();
      });
      
      marker.on('mouseout', () => {
        marker.closePopup();
      });
      
      // Store marker reference for cleanup
      markers.current.push(marker);
      
      // Extend bounds to include this location
      bounds.extend([lat, lng]);
    });
    
    // Fit map to show all markers if there are any
    if (bounds.isValid()) {
      map.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15
      });
    }
    
    // If a restaurant is selected, center on it
    if (selectedRestaurant?.location?.coordinates) {
      const { lat, lng } = selectedRestaurant.location.coordinates;
      map.current.setView([lat, lng], 14, {
        animate: true,
        duration: 1
      });
    }
    
  }, [restaurants, selectedRestaurant, mapLoaded]);

  return (
    <div className="relative w-full h-full min-h-[250px]">
      {mapError && (
        <div className="absolute inset-0 bg-gray-50 p-4 flex flex-col items-center justify-center text-center z-10 rounded-lg">
          <p className="text-red-500 text-sm mb-2">{mapError}</p>
          <button 
            onClick={initializeMap}
            className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
      
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      {/* Fallback for restaurant list if map fails to load */}
      {(!mapLoaded && !mapError) && (
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
