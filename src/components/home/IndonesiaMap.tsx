
import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useMobile } from "@/hooks/use-mobile";

interface LocationMarker {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  impact: string;
  harvest: string;
  clients: number;
}

export const IndonesiaMap = () => {
  const [zoom, setZoom] = useState(1);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const isMobile = useMobile();
  
  const locations: LocationMarker[] = [
    {
      id: 'jakarta',
      name: 'Jakarta Hub',
      description: 'Our flagship urban farming center serving Indonesia\'s capital',
      x: 35,
      y: 30,
      impact: 'Providing fresh produce to 50,000+ urban residents',
      harvest: '2,500 kg monthly',
      clients: 24
    },
    {
      id: 'bali',
      name: 'Bali Eco-Center',
      description: 'Sustainable tourism meets agriculture innovation',
      x: 60,
      y: 45,
      impact: 'Reducing carbon footprint by 30% for hotel partners',
      harvest: '1,800 kg monthly',
      clients: 16
    },
    {
      id: 'sulawesi',
      name: 'Sulawesi Outreach',
      description: 'Bringing technology to traditional farming communities',
      x: 48,
      y: 60,
      impact: 'Training 120+ local farmers in advanced techniques',
      harvest: '3,200 kg monthly',
      clients: 9
    },
    {
      id: 'papua',
      name: 'Papua Initiative',
      description: 'Supporting remote communities with fresh food access',
      x: 70,
      y: 20,
      impact: 'Improving food security for 8 remote villages',
      harvest: '950 kg monthly',
      clients: 5
    },
    {
      id: 'sumatra',
      name: 'Sumatra Center',
      description: 'Largest container farm complex focused on export crops',
      x: 25,
      y: 55,
      impact: 'Creating 45 new jobs in agricultural technology',
      harvest: '5,100 kg monthly',
      clients: 12
    }
  ];

  const handleZoomIn = () => {
    if (zoom < 2) setZoom(zoom + 0.25);
  };

  const handleZoomOut = () => {
    if (zoom > 0.75) setZoom(zoom - 0.25);
  };

  const handleLocationClick = (locationId: string) => {
    if (isMobile) {
      setSelectedLocation(selectedLocation === locationId ? null : locationId);
    }
  };

  return (
    <div className={`relative w-full mb-6 rounded-lg overflow-hidden ${isMobile ? 'h-[250px]' : 'h-[400px]'}`}>
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-in-out"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        <img 
          src="/lovable-uploads/5dc7ab47-f164-425c-8978-1b96ad8b36e6.png"
          alt="Indonesia Map" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-primary/10"></div>
        
        {/* Location markers */}
        {locations.map((location) => (
          <div 
            key={location.id}
            className="absolute"
            style={{ top: `${location.y}%`, left: `${location.x}%` }}
            onMouseEnter={() => !isMobile && setHoveredLocation(location.id)}
            onMouseLeave={() => !isMobile && setHoveredLocation(null)}
            onClick={() => handleLocationClick(location.id)}
          >
            <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} bg-primary rounded-full ${
              (hoveredLocation === location.id || selectedLocation === location.id) 
                ? 'ring-4 ring-primary/30' 
                : 'animate-pulse'}`}>
            </div>
            
            {/* Tooltip on hover for desktop, on click for mobile */}
            {((isMobile && selectedLocation === location.id) || 
               (!isMobile && hoveredLocation === location.id)) && (
              <div className={`absolute z-10 bg-white rounded-lg shadow-lg p-3 -translate-x-1/2 ${
                isMobile ? 'w-48 -translate-y-full -mt-2' : 'w-64 -translate-y-full -mt-2'
              }`}>
                <h4 className="font-semibold text-primary">{location.name}</h4>
                {!isMobile && <p className="text-xs text-gray-600 mb-2">{location.description}</p>}
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {!isMobile && (
                    <div className="flex justify-between">
                      <span className="font-medium">Impact:</span>
                      <span className="text-gray-600">{location.impact}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium">Harvest:</span>
                    <span className="text-gray-600">{location.harvest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Clients:</span>
                    <span className="text-gray-600">{location.clients}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
        >
          <ZoomIn size={16} className="text-gray-700" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
        >
          <ZoomOut size={16} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};
