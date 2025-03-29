
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, Wind, Leaf, BarChart2 } from "lucide-react";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { getMockSensorData } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Button } from "@/components/ui/button";

const Climate = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const sensorData = getMockSensorData();
  
  // Filter for climate sensors
  const climateSensors = sensorData.filter(sensor => sensor.category === 'climate');

  // CO2 savings data based on ESG International standard
  const co2SavingsData = {
    daily: 15.7, // kg
    monthly: 471, // kg
    yearly: 5725, // kg
    treeEquivalent: 260, // trees per year
    waterSaved: 1200000, // liters per year
    traditionalComparison: 68, // % reduction compared to traditional farming
    carbonCredits: 4.2, // estimated carbon credits per year
  };

  // Map icon name to icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'thermometer': return <Thermometer className="w-5 h-5" />;
      case 'wind': return <Wind className="w-5 h-5" />;
      default: return <Thermometer className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Climate Control & Sustainability</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* CO2 Savings Section */}
      <Card className="border-akar-green/20">
        <CardHeader className="bg-gradient-to-r from-akar-lightgreen/10 to-akar-green/10 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Leaf className="text-akar-green h-6 w-6" />
            <CardTitle>Carbon Footprint Reduction</CardTitle>
          </div>
          <CardDescription>
            ESG International Standard measurement of CO2 savings compared to traditional farming
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">CO2 Emissions Saved</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-akar-green/5 rounded-lg">
                  <span>Daily CO2 Reduction</span>
                  <span className="font-semibold">{co2SavingsData.daily} kg</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-akar-green/10 rounded-lg">
                  <span>Monthly CO2 Reduction</span>
                  <span className="font-semibold">{co2SavingsData.monthly} kg</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-akar-green/20 rounded-lg">
                  <span>Yearly CO2 Reduction</span>
                  <span className="font-semibold">{co2SavingsData.yearly} kg</span>
                </div>
                <Alert variant="success" className="mt-4">
                  <Leaf className="h-4 w-4" />
                  <AlertTitle>Equivalent to {co2SavingsData.treeEquivalent} trees per year</AlertTitle>
                  <AlertDescription>
                    Your AKAR farm's carbon reduction is comparable to the CO2 absorption of {co2SavingsData.treeEquivalent} mature trees annually.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Sustainability Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span>Water Usage Reduction</span>
                  <div className="text-right">
                    <div className="font-semibold">{co2SavingsData.waterSaved.toLocaleString()} L</div>
                    <div className="text-sm text-muted-foreground">saved yearly</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span>Carbon Footprint Reduction</span>
                  <div className="text-right">
                    <div className="font-semibold">{co2SavingsData.traditionalComparison}%</div>
                    <div className="text-sm text-muted-foreground">vs. traditional farming</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span>Est. Carbon Credits</span>
                  <div className="text-right">
                    <div className="font-semibold">{co2SavingsData.carbonCredits}</div>
                    <div className="text-sm text-muted-foreground">credits per year</div>
                  </div>
                </div>
                <div className="bg-akar-green/10 p-4 rounded-lg">
                  <div className="font-medium mb-2">ESG Certification Status</div>
                  <div className="flex items-center">
                    <Badge variant="success">Certified</Badge>
                    <span className="ml-2 text-sm">International Sustainability Standard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Climate Sensors */}
      <Card>
        <CardHeader>
          <CardTitle>Climate Control System</CardTitle>
          <CardDescription>
            Monitor and manage your AKAR farm's climate conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
              <TabsTrigger value="airflow">Airflow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="temperature" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {climateSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('temp'))
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
            
            <TabsContent value="humidity" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {climateSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('humid'))
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
            
            <TabsContent value="airflow" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {climateSensors
                  .filter(sensor => sensor.name.toLowerCase().includes('air') || sensor.name.toLowerCase().includes('flow'))
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
          </Tabs>
        </CardContent>
      </Card>

      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Climate System Configuration (Admin Only)</CardTitle>
            <CardDescription>Advanced climate control settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <Thermometer className="mr-2 h-4 w-4" />
                  Calibrate Temperature Sensors
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Export CO2 Savings Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Wind className="mr-2 h-4 w-4" />
                  Adjust Ventilation System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Climate;
