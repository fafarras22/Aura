
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { getMockSensorData } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplet, Droplets, Waves, FlaskConical, AlertCircle } from "lucide-react";

const Water = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const sensorData = getMockSensorData();
  
  // Filter for water sensors
  const waterSensors = sensorData.filter(sensor => sensor.category === 'water');

  // Water system status data
  const waterSystemData = {
    mainTank: {
      capacity: 1000, // liters
      current: 780, // liters
      refillDays: 12, // days until refill needed
      refillDate: "2023-09-15", // next scheduled refill date
      dailyUsage: 18, // liters per day
    },
    nutrientTank: {
      capacity: 200, // liters
      current: 135, // liters
      refillDays: 8, // days until refill needed
      refillDate: "2023-09-11", // next scheduled refill date
      dailyUsage: 7, // liters per day
    },
    wasteTank: {
      capacity: 300, // liters
      current: 65, // liters
      emptyDays: 28, // days until emptying needed
      emptyDate: "2023-10-01", // next scheduled emptying date
      dailyAccumulation: 3, // liters per day
    },
    filters: {
      primary: "Good - 87% remaining",
      secondary: "Good - 92% remaining",
      final: "Good - 95% remaining",
      nextMaintenance: "2023-10-15",
    }
  };

  // Map icon name to icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'droplet': return <Droplet className="w-5 h-5" />;
      case 'droplets': return <Droplets className="w-5 h-5" />;
      case 'waves': return <Waves className="w-5 h-5" />;
      case 'flask-conical': return <FlaskConical className="w-5 h-5" />;
      case 'alert-circle': return <AlertCircle className="w-5 h-5" />;
      default: return <Droplet className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Water System Management</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Water Tank Status */}
      <Card className="border-akar-green/20">
        <CardHeader className="bg-gradient-to-r from-akar-lightgreen/10 to-akar-green/10 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Waves className="text-akar-green h-6 w-6" />
            <CardTitle>Water Tank Status</CardTitle>
          </div>
          <CardDescription>
            Monitor water levels and schedule refills for your AKAR farm
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Water Tank */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Main Water Tank</CardTitle>
                <CardDescription>
                  Clean water supply for irrigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Current Level:</span>
                    <span className="font-medium">{waterSystemData.mainTank.current} / {waterSystemData.mainTank.capacity} L</span>
                  </div>
                  <Progress value={(waterSystemData.mainTank.current / waterSystemData.mainTank.capacity) * 100} className="h-3" />
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Usage:</span>
                      <span>{waterSystemData.mainTank.dailyUsage} L/day</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Refill:</span>
                      <span className="font-medium">{waterSystemData.mainTank.refillDays} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Refill Date:</span>
                      <span>{waterSystemData.mainTank.refillDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrient Tank */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Nutrient Tank</CardTitle>
                <CardDescription>
                  Nutrient solution for plants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Current Level:</span>
                    <span className="font-medium">{waterSystemData.nutrientTank.current} / {waterSystemData.nutrientTank.capacity} L</span>
                  </div>
                  <Progress value={(waterSystemData.nutrientTank.current / waterSystemData.nutrientTank.capacity) * 100} className="h-3" />
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Usage:</span>
                      <span>{waterSystemData.nutrientTank.dailyUsage} L/day</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Refill:</span>
                      <span className="font-medium">{waterSystemData.nutrientTank.refillDays} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Refill Date:</span>
                      <span>{waterSystemData.nutrientTank.refillDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waste Tank */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Waste Tank</CardTitle>
                <CardDescription>
                  Collected runoff water
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Current Level:</span>
                    <span className="font-medium">{waterSystemData.wasteTank.current} / {waterSystemData.wasteTank.capacity} L</span>
                  </div>
                  <Progress value={(waterSystemData.wasteTank.current / waterSystemData.wasteTank.capacity) * 100} className="h-3" />
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Accumulation:</span>
                      <span>{waterSystemData.wasteTank.dailyAccumulation} L/day</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Emptying:</span>
                      <span className="font-medium">{waterSystemData.wasteTank.emptyDays} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Empty Date:</span>
                      <span>{waterSystemData.wasteTank.emptyDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Alert variant="success">
              <Droplet className="h-4 w-4" />
              <AlertTitle>Water Usage Optimization</AlertTitle>
              <AlertDescription>
                Your AKAR farm is using 95% less water than traditional farming methods. 
                Current water efficiency rating: Excellent.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Water Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Water System Sensors</CardTitle>
          <CardDescription>
            Monitor water quality, flow and filtration systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quality">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="quality">Water Quality</TabsTrigger>
              <TabsTrigger value="flow">Flow Rates</TabsTrigger>
              <TabsTrigger value="filtration">Filtration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quality" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {waterSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('ph') || 
                                    sensor.name.toLowerCase().includes('quality') ||
                                    sensor.name.toLowerCase().includes('conductivity'))
                  .map((sensor) => (
                    <SensorCard
                      key={sensor.id}
                      title={sensor.name}
                      value={sensor.value}
                      unit={sensor.unit}
                      icon={getIconComponent(sensor.iconName)}
                      status={sensor.status}
                      progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                      minValue={sensor.minValue}
                      maxValue={sensor.maxValue}
                      lastUpdated={sensor.lastUpdated}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="flow" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {waterSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('flow') || 
                                   sensor.name.toLowerCase().includes('pressure'))
                  .map((sensor) => (
                    <SensorCard
                      key={sensor.id}
                      title={sensor.name}
                      value={sensor.value}
                      unit={sensor.unit}
                      icon={getIconComponent(sensor.iconName)}
                      status={sensor.status}
                      progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                      minValue={sensor.minValue}
                      maxValue={sensor.maxValue}
                      lastUpdated={sensor.lastUpdated}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="filtration" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Filter Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Primary Filter:</span>
                        <span className="font-medium">{waterSystemData.filters.primary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Secondary Filter:</span>
                        <span className="font-medium">{waterSystemData.filters.secondary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Final Filter:</span>
                        <span className="font-medium">{waterSystemData.filters.final}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Maintenance:</span>
                        <span className="font-medium">{waterSystemData.filters.nextMaintenance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Filtration Sensors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {waterSensors
                        .filter(sensor => sensor.name.toLowerCase().includes('filter'))
                        .map((sensor) => (
                          <SensorCard
                            key={sensor.id}
                            title={sensor.name}
                            value={sensor.value}
                            unit={sensor.unit}
                            icon={getIconComponent(sensor.iconName)}
                            status={sensor.status}
                            progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                            minValue={sensor.minValue}
                            maxValue={sensor.maxValue}
                            lastUpdated={sensor.lastUpdated}
                          />
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Water System Administration (Admin Only)</CardTitle>
            <CardDescription>Advanced water system controls and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <Droplets className="mr-2 h-4 w-4" />
                  Adjust Irrigation Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FlaskConical className="mr-2 h-4 w-4" />
                  Calibrate Nutrient Dosing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Run System Diagnostics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Water;
