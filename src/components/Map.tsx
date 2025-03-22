
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
      // Create the map instance with custom styling
      map.current = L.map(mapContainer.current, {
        center: [59.3293, 18.0686], // Stockholm coordinates by default
        zoom: 13,
        zoomControl: false, // We'll add our own zoom control in a better position
        attributionControl: false, // We'll add our own attribution control with custom styling
      });

      // Add custom styled tile layer - Using a more subtle map style
      // Using CartoDB Voyager tiles which are more subtle and neutral
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        opacity: 0.9,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map.current);
      
      // Add custom styled attribution
      L.control.attribution({
        position: 'bottomright',
        prefix: '<a href="https://leafletjs.com" class="text-xs text-brand-600 hover:text-brand-700">Leaflet</a> | <a href="https://carto.com/attributions" class="text-xs text-gray-500 hover:text-gray-700">CARTO</a>'
      }).addTo(map.current);
      
      // Add zoom control with custom position
      L.control.zoom({ 
        position: 'topright',
        zoomInTitle: 'Zoom in',
        zoomOutTitle: 'Zoom out',
      }).addTo(map.current);

      // Apply custom CSS to the map for better integration with app design
      const mapElement = mapContainer.current.querySelector('.leaflet-container');
      if (mapElement) {
        // Make map controls more subtle
        mapElement.classList.add('rounded-lg', 'shadow-md', 'border', 'border-gray-200');
      }
      
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
    
    // Add custom CSS for Leaflet controls
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-control-zoom {
        border: none !important;
        margin: 12px !important;
      }
      .leaflet-control-zoom a {
        background-color: white !important;
        color: #555 !important;
        border: 1px solid #e5e7eb !important;
        width: 32px !important;
        height: 32px !important;
        line-height: 30px !important;
        font-size: 16px !important;
        border-radius: 6px !important;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
        margin-bottom: 5px !important;
      }
      .leaflet-control-zoom a:hover {
        background-color: #f9fafb !important;
        color: #00A67E !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
      }
      .leaflet-popup-content {
        margin: 12px !important;
      }
      .leaflet-container {
        font-family: 'Outfit', sans-serif !important;
        background-color: #f8fafc !important;
      }
      .leaflet-container a {
        color: #00A67E !important;
      }
      /* Apply subtle filter to map tiles for a more cohesive design */
      .leaflet-tile {
        filter: saturate(0.85) hue-rotate(5deg) brightness(1.02) contrast(0.95) !important;
      }
      .leaflet-attribution-flag {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
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
      
      // Remove custom styles
      document.head.removeChild(style);
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
      
      // Create custom marker icon with subtle branded styling
      const customIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: `
          <div class="${selectedRestaurant?.id === restaurant.id 
            ? 'bg-brand-500 text-white shadow-lg transform scale-110' 
            : 'bg-white text-gray-700 border border-gray-200 shadow-md'} 
            p-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
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
      
      // Create popup with restaurant info using a more subtle design
      const popup = L.popup({
        closeButton: false,
        offset: [0, -15],
        className: 'custom-popup',
      }).setContent(`
        <div class="p-1">
          <h3 class="font-bold text-gray-900">${restaurant.name}</h3>
          <p class="text-sm text-gray-600">${restaurant.location.address || ''}</p>
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
    
    // If a restaurant is selected, center on it with animation
    if (selectedRestaurant?.location?.coordinates) {
      const { lat, lng } = selectedRestaurant.location.coordinates;
      map.current.setView([lat, lng], 14, {
        animate: true,
        duration: 1
      });
    }
    
  }, [restaurants, selectedRestaurant, mapLoaded]);

  return (
    <div className="relative w-full h-full min-h-[250px] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
      {mapError && (
        <div className="absolute inset-0 bg-white p-4 flex flex-col items-center justify-center text-center z-10 rounded-lg">
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
        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center text-center z-10 rounded-lg">
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
