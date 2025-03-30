
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SensorCard } from "@/components/sensors/SensorCard";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplet, Wind, Zap, FlaskConical, Waves } from "lucide-react";
import { getMockSensorData } from "@/services/mockDataService";

const Sensors = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const sensorData = getMockSensorData();
  const errorSensors = sensorData.filter(sensor => sensor.status === 'error');
  const warningSensors = sensorData.filter(sensor => sensor.status === 'warning');
  
  // Filter sensors by category
  const climateSensors = sensorData.filter(sensor => sensor.category === 'climate');
  const waterSensors = sensorData.filter(sensor => sensor.category === 'water');
  const energySensors = sensorData.filter(sensor => sensor.category === 'energy');
  const environmentSensors = sensorData.filter(sensor => sensor.category === 'environment');
  
  // Get icon component based on sensor type
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'thermometer': return <Thermometer className="h-5 w-5" />;
      case 'droplet': return <Droplet className="h-5 w-5" />;
      case 'wind': return <Wind className="h-5 w-5" />;
      case 'zap': return <Zap className="h-5 w-5" />;
      case 'flask-conical': return <FlaskConical className="h-5 w-5" />;
      case 'waves': return <Waves className="h-5 w-5" />;
      default: return <Thermometer className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sensors</h1>
          <p className="text-muted-foreground">
            Monitor all container farm sensor readings in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            {errorSensors.length} Critical
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            {warningSensors.length} Warnings
          </Badge>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sensor Overview</CardTitle>
          <CardDescription>
            All sensor readings from the container farm environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="climate">Climate</TabsTrigger>
              <TabsTrigger value="water">Water</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sensorData.map(sensor => (
                  <SensorCard
                    key={sensor.id}
                    name={sensor.name}
                    value={sensor.value}
                    unit={sensor.unit}
                    status={sensor.status}
                    icon={getIconComponent(sensor.iconName)}
                    lastUpdated={sensor.lastUpdated}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="climate" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {climateSensors.map(sensor => (
                  <SensorCard
                    key={sensor.id}
                    name={sensor.name}
                    value={sensor.value}
                    unit={sensor.unit}
                    status={sensor.status}
                    icon={getIconComponent(sensor.iconName)}
                    lastUpdated={sensor.lastUpdated}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="water" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {waterSensors.map(sensor => (
                  <SensorCard
                    key={sensor.id}
                    name={sensor.name}
                    value={sensor.value}
                    unit={sensor.unit}
                    status={sensor.status}
                    icon={getIconComponent(sensor.iconName)}
                    lastUpdated={sensor.lastUpdated}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="energy" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {energySensors.map(sensor => (
                  <SensorCard
                    key={sensor.id}
                    name={sensor.name}
                    value={sensor.value}
                    unit={sensor.unit}
                    status={sensor.status}
                    icon={getIconComponent(sensor.iconName)}
                    lastUpdated={sensor.lastUpdated}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="environment" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {environmentSensors.map(sensor => (
                  <SensorCard
                    key={sensor.id}
                    name={sensor.name}
                    value={sensor.value}
                    unit={sensor.unit}
                    status={sensor.status}
                    icon={getIconComponent(sensor.iconName)}
                    lastUpdated={sensor.lastUpdated}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="alerts" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sensorData.filter(s => s.status !== 'normal').map(sensor => (
                  <SensorCard
                    key={sensor.id}
                    name={sensor.name}
                    value={sensor.value}
                    unit={sensor.unit}
                    status={sensor.status}
                    icon={getIconComponent(sensor.iconName)}
                    lastUpdated={sensor.lastUpdated}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sensors;
