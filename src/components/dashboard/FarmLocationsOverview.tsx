
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ThermometerSnowflake, Droplet, Leaf, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppleButton } from '@/components/ui/apple-button';

interface FarmLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    x: number;
    y: number;
  };
}

interface FarmLocationsOverviewProps {
  farmLocations: FarmLocation[];
}

export function FarmLocationsOverview({ farmLocations }: FarmLocationsOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Map visualization (simplified) */}
      <div className="relative bg-slate-100 dark:bg-slate-800 rounded-lg h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Container location markers */}
        {farmLocations.map((location) => (
          <div 
            key={location.id}
            className="absolute w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md cursor-pointer transform hover:scale-110 transition-transform"
            style={{ 
              left: `${location.coordinates.x}%`, 
              top: `${location.coordinates.y}%`,
            }}
          >
            <MapPin className="w-3 h-3 text-white" />
          </div>
        ))}
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold mb-1">Container Farm Network</h3>
          <p className="text-white/80 text-sm">Interactive map showing all container farms in the AKAR ecosystem</p>
        </div>
      </div>
      
      {/* Container cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farmLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden border border-slate-200 hover:border-primary/50 transition-colors">
            <div className="bg-slate-50 dark:bg-slate-800 h-32 relative">
              {/* Container farm image (simulated) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-800/70 to-green-500/50" />
              
              <div className="absolute top-3 left-3">
                <Badge variant="outline" className="bg-white/90 text-slate-800">
                  {location.name}
                </Badge>
              </div>
              
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <ThermometerSnowflake className="w-3 h-3 mr-1" /> 24°C
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-0">
                    <Droplet className="w-3 h-3 mr-1" /> 65%
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-0">
                    <Leaf className="w-3 h-3 mr-1" /> Healthy
                  </Badge>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="mb-3">
                <h4 className="font-semibold">{location.name}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {location.address}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-xs">
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium">85%</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Harvest Cycle</p>
                  <p className="font-medium">21 days</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Crop Type</p>
                  <p className="font-medium">Mixed Greens</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Last Maintenance</p>
                  <p className="font-medium">3 days ago</p>
                </div>
              </div>
              
              <AppleButton size="sm" variant="outline" className="w-full">
                <ExternalLink className="w-3 h-3 mr-1" /> View Details
              </AppleButton>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="default">View All Container Farms</Button>
      </div>
    </div>
  );
}
