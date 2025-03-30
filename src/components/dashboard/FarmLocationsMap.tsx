import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '@/components/ui/theme-provider';

// Dummy token - in a real app this should be set as an environment variable
const MAPBOX_TOKEN = 'pk.dummy.token';

// Updated interface to match what's used in the component
export interface FarmLocation {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: 'active' | 'inactive' | 'maintenance';
  containers: number;
  address: string;
  coordinates?: [number, number]; // Made optional for backwards compatibility
}

interface FarmLocationsMapProps {
  locations: FarmLocation[];
}

export const FarmLocationsMap: React.FC<FarmLocationsMapProps> = ({ locations }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' 
        ? 'mapbox://styles/mapbox/dark-v10' 
        : 'mapbox://styles/mapbox/light-v10',
      center: [118.0149, -2.6000], // Center on Indonesia
      zoom: 3.5,
      accessToken: MAPBOX_TOKEN,
    });
    
    // Process locations to ensure they have coordinates for backward compatibility
    const processedLocations = locations.map(location => {
      if (!location.coordinates) {
        return {
          ...location,
          coordinates: [location.location.lng, location.location.lat]
        };
      }
      return location;
    });
    
    // Add markers for each location
    processedLocations.forEach(location => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'farm-marker';
      
      // Set color based on status
      if (location.status === 'active') {
        el.style.backgroundColor = '#4CAF50';
      } else if (location.status === 'maintenance') {
        el.style.backgroundColor = '#FFC107';
      } else {
        el.style.backgroundColor = '#F44336';
      }
      
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div>
            <h3 style="margin: 0 0 5px; font-weight: 600;">${location.name}</h3>
            <p style="margin: 0 0 5px;">${location.address}</p>
            <p style="margin: 0; color: ${
              location.status === 'active' ? '#4CAF50' : 
              location.status === 'maintenance' ? '#FFC107' : '#F44336'
            }">
              Status: ${location.status.toUpperCase()}
            </p>
            <p>Containers: ${location.containers}</p>
          </div>
        `);
      
      // Add to map
      new mapboxgl.Marker(el)
        .setLngLat([location.location.lng, location.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
    
    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, [locations, theme]);
  
  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full min-h-[300px] rounded-lg overflow-hidden"
    />
  );
};
