
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMockSensorData } from "@/services/mockDataService";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { Thermometer, Droplet, Wind, Zap, FlaskConical, Waves, AlertCircle, Droplets } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Sensors = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const sensorData = getMockSensorData();
  const { toast } = useToast();
  
  // Group sensors by category
  const climateSensors = sensorData.filter(sensor => sensor.category === 'climate');
  const waterSensors = sensorData.filter(sensor => sensor.category === 'water');
  const nutrientSensors = sensorData.filter(sensor => sensor.category === 'nutrient');
  const systemSensors = sensorData.filter(sensor => sensor.category === 'system');

  // Map icon name to icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'thermometer': return <Thermometer className="w-5 h-5" />;
      case 'droplet': return <Droplet className="w-5 h-5" />;
      case 'droplets': return <Droplets className="w-5 h-5" />;
      case 'wind': return <Wind className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'flask-conical': return <FlaskConical className="w-5 h-5" />;
      case 'waves': return <Waves className="w-5 h-5" />;
      case 'alert-circle': return <AlertCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const handleCalibrate = () => {
    toast({
      title: "Calibration Initiated",
      description: "Sensor calibration process has started. This may take a few minutes.",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Sensors Refreshed",
      description: "Sensor data has been updated with the latest readings.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Sensor Monitoring</h1>
        <div className="flex space-x-2">
          {isDeveloperMode && (
            <Button variant="outline" onClick={handleCalibrate}>
              Calibrate Sensors
            </Button>
          )}
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sensor Status Overview</CardTitle>
          <CardDescription>
            {sensorData.filter(s => s.status === 'normal').length} sensors operating normally, 
            {' '}{sensorData.filter(s => s.status === 'warning').length} warnings, 
            {' '}{sensorData.filter(s => s.status === 'error').length} critical issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="climate">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="climate">Climate</TabsTrigger>
              <TabsTrigger value="water">Water</TabsTrigger>
              <TabsTrigger value="nutrient">Nutrients</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="climate" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {climateSensors.map((sensor) => (
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
            
            <TabsContent value="water" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {waterSensors.map((sensor) => (
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
            
            <TabsContent value="nutrient" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nutrientSensors.map((sensor) => (
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
            
            <TabsContent value="system" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemSensors.map((sensor) => (
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
            <CardTitle>Sensor Management (Admin Only)</CardTitle>
            <CardDescription>Advanced sensor settings and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <FlaskConical className="mr-2 h-4 w-4" />
                  Adjust Sensor Thresholds
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="mr-2 h-4 w-4" />
                  Configure Alert Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Sensor Diagnostics
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Last sensor maintenance: 2023-07-01</p>
                <p>Sensor firmware: v1.4.2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Sensors;
