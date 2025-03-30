
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { FarmLocation } from "@/services/mockDataService";

interface FarmLocationsMapProps {
  locations: FarmLocation[];
}

export const FarmLocationsMap = ({ locations }: FarmLocationsMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a production environment, you would use a mapping library like Mapbox, Google Maps, or Leaflet
    if (!mapRef.current) return;
    
    // Mock map initialization
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';
    
    // Create a simple mock map with dots for locations
    const mapElement = document.createElement('div');
    mapElement.className = 'relative w-full h-full rounded-md overflow-hidden bg-gray-100';
    
    // Add the map image (using a placeholder)
    const mapImage = document.createElement('img');
    mapImage.src = '/lovable-uploads/5dc7ab47-f164-425c-8978-1b96ad8b36e6.png';
    mapImage.className = 'w-full h-full object-cover opacity-70';
    mapElement.appendChild(mapImage);
    
    // Add location markers
    locations.forEach(location => {
      const markerElement = document.createElement('div');
      markerElement.className = 'absolute flex flex-col items-center';
      markerElement.style.left = `${location.coordinates.x}%`;
      markerElement.style.top = `${location.coordinates.y}%`;
      
      const pinElement = document.createElement('div');
      pinElement.className = 'w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg relative z-10';
      markerElement.appendChild(pinElement);
      
      // Simulate a pin drop shadow effect
      const shadowElement = document.createElement('div');
      shadowElement.className = 'w-4 h-1 bg-black/20 rounded-full mt-0.5 blur-sm';
      markerElement.appendChild(shadowElement);
      
      mapElement.appendChild(markerElement);
    });
    
    mapContainer.appendChild(mapElement);
  }, [locations]);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Farm Locations</CardTitle>
            <CardDescription>All AKAR container farms in North Jakarta</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {locations.length} Farms
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div ref={mapRef} className="w-full h-64 rounded-md overflow-hidden border border-border">
            {/* Map will be rendered here */}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {locations.map((location, index) => (
              <div 
                key={location.id} 
                className="flex items-center gap-2 p-2 rounded-md border border-border"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">Farm #{index + 1}</p>
                  <p className="text-xs text-muted-foreground truncate">{location.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
