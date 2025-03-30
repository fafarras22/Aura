import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropletIcon, BarChart2, Droplet, Thermometer, Flask } from "lucide-react";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { getMockSensorData, SensorStatus } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Button } from "@/components/ui/button";

const Water = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const sensorData = getMockSensorData();
  
  // Filter for water sensors
  const waterSensors = sensorData.filter(sensor => sensor.category === 'water');

  // Map icon name to icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'droplet': return <Droplet className="w-5 h-5" />;
      case 'thermometer': return <Thermometer className="w-5 h-5" />;
      case 'flask': return <Flask className="w-5 h-5" />;
      default: return <Droplet className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Water Quality & Management</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Water Quality Monitoring</CardTitle>
          <CardDescription>
            Real-time monitoring of water quality parameters in the container farm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ph">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="ph">pH Level</TabsTrigger>
              <TabsTrigger value="nutrients">Nutrient Levels</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="dissolvedOxygen">Dissolved Oxygen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ph" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {waterSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('ph'))
                  .map((sensor) => (
                    <SensorCard
                      key={sensor.id}
                      title={sensor.name}
                      value={sensor.value}
                      unit={sensor.unit}
                      icon={getIconComponent(sensor.iconName)}
                      status={sensor.status as SensorStatus}
                      progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                      minValue={sensor.minValue}
                      maxValue={sensor.maxValue}
                      lastUpdated={sensor.lastUpdated}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nutrients" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {waterSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('nutrient'))
                  .map((sensor) => (
                    <SensorCard
                      key={sensor.id}
                      title={sensor.name}
                      value={sensor.value}
                      unit={sensor.unit}
                      icon={getIconComponent(sensor.iconName)}
                      status={sensor.status as SensorStatus}
                      progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                      minValue={sensor.minValue}
                      maxValue={sensor.maxValue}
                      lastUpdated={sensor.lastUpdated}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="temperature" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {waterSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('temperature'))
                  .map((sensor) => (
                    <SensorCard
                      key={sensor.id}
                      title={sensor.name}
                      value={sensor.value}
                      unit={sensor.unit}
                      icon={getIconComponent(sensor.iconName)}
                      status={sensor.status as SensorStatus}
                      progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                      minValue={sensor.minValue}
                      maxValue={sensor.maxValue}
                      lastUpdated={sensor.lastUpdated}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="dissolvedOxygen" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {waterSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('oxygen'))
                  .map((sensor) => (
                    <SensorCard
                      key={sensor.id}
                      title={sensor.name}
                      value={sensor.value}
                      unit={sensor.unit}
                      icon={getIconComponent(sensor.iconName)}
                      status={sensor.status as SensorStatus}
                      progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                      minValue={sensor.minValue}
                      maxValue={sensor.maxValue}
                      lastUpdated={sensor.lastUpdated}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Water System Configuration (Admin Only)</CardTitle>
            <CardDescription>Advanced water management settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <DropletIcon className="mr-2 h-4 w-4" />
                  Calibrate pH Sensors
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Export Water Usage Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Flask className="mr-2 h-4 w-4" />
                  Adjust Nutrient Mix
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
