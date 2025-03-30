
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ThermometerSnowflake, Droplet, Leaf, ExternalLink, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppleButton } from '@/components/ui/apple-button';
import { FarmLocation } from '@/services/mockDataService';
import { useDeveloperMode } from '@/context/DeveloperModeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FarmLocationsOverviewProps {
  farmLocations: FarmLocation[];
}

export function FarmLocationsOverview({ farmLocations }: FarmLocationsOverviewProps) {
  const { isDeveloperMode, currentUser } = useDeveloperMode();
  
  // Filter locations based on user role
  const filteredLocations = isDeveloperMode 
    ? farmLocations 
    : farmLocations.filter(location => {
        // If user is a client, only show their assigned location
        if (currentUser?.role === 'client' && currentUser?.containerId) {
          // Assuming the containerId is part of the location name or ID
          return location.id.includes(currentUser.containerId) || 
                 location.name.includes(currentUser.containerId);
        }
        return true;
      });

  return (
    <div className="space-y-6">
      {/* Conditional alert for developer mode */}
      {isDeveloperMode && (
        <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900 dark:text-blue-300">
          <MapPin className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Developer mode: Viewing all {farmLocations.length} container farm locations
          </AlertDescription>
        </Alert>
      )}
      
      {/* Map visualization (simplified) */}
      <div className="relative bg-slate-100 dark:bg-slate-800 rounded-lg h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Show text if client has no containers */}
        {filteredLocations.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <div className="bg-white/90 dark:bg-black/70 p-4 rounded-lg max-w-xs">
              <Lock className="w-5 h-5 mx-auto mb-2 text-gray-500" />
              <p className="text-sm font-medium">No container locations available</p>
              <p className="text-xs text-muted-foreground mt-1">Your account doesn't have access to any container farms</p>
            </div>
          </div>
        )}
        
        {/* Container location markers */}
        {filteredLocations.map((location) => (
          <div 
            key={location.id}
            className="absolute w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md cursor-pointer transform hover:scale-110 transition-transform"
            style={{ 
              // Use a calculation based on lat/lng to position markers on the simplified map
              left: `${((location.location.lng - 95) / 40) * 100}%`, 
              top: `${((location.location.lat + 10) / 20) * 100}%`,
            }}
          >
            <MapPin className="w-3 h-3 text-white" />
          </div>
        ))}
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-sm mb-1">Container Farm Network</h3>
          <p className="text-white/80 text-xs">
            {isDeveloperMode 
              ? "Interactive map showing all container farms in the AKAR ecosystem"
              : "Interactive map showing your assigned container farms"}
          </p>
        </div>
      </div>
      
      {/* Container cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden border border-slate-200 hover:border-primary/50 transition-colors">
            <div className="bg-slate-50 dark:bg-slate-800 h-28 relative">
              {/* Container farm image (simulated) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-800/70 to-green-500/50" />
              
              <div className="absolute top-3 left-3">
                <Badge variant="outline" className="bg-white/90 text-slate-800 text-xs">
                  {location.name}
                </Badge>
              </div>
              
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                    <ThermometerSnowflake className="w-3 h-3 mr-1" /> 24°C
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                    <Droplet className="w-3 h-3 mr-1" /> 65%
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">
                    <Leaf className="w-3 h-3 mr-1" /> Healthy
                  </Badge>
                </div>
              </div>
            </div>
            
            <CardContent className="p-3">
              <div className="mb-2">
                <h4 className="font-semibold text-sm">{location.name}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {location.address}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
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
              
              <AppleButton size="sm" variant="outline" className="w-full text-xs">
                <ExternalLink className="w-3 h-3 mr-1" /> View Details
              </AppleButton>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {isDeveloperMode && filteredLocations.length > 0 && (
        <div className="flex justify-center">
          <Button variant="default" size="sm" className="text-xs">View All Container Farms</Button>
        </div>
      )}
    </div>
  );
}
