import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AppHeader } from "@/components/layout/AppHeader";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { getMockSensorData, SensorData } from "@/services/mockDataService";
import { getMockClimateData } from "@/services/mock-data";
import { Thermometer, Droplet, Wind, Activity, AlertCircle } from "lucide-react";
import { SensorCard } from "@/components/sensors/SensorCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Mock sensor history data
const generateMockSensorHistory = (days: number, baseValue: number, variance: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i += 4) { // Every 4 hours
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    // Generate random variance within range
    const randomVariance = (Math.random() * 2 - 1) * variance;
    const value = baseValue + randomVariance;
    
    data.push({
      timestamp: format(date, "MMM dd, HH:mm"),
      value: Number(value.toFixed(1))
    });
  }
  
  return data.reverse();
};

const Sensors = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Fetch all sensor data
  const allSensors = getMockSensorData();
  
  // Filter sensors based on selected category
  const filteredSensors = selectedCategory === "all" 
    ? allSensors 
    : allSensors.filter(sensor => sensor.category === selectedCategory);
  
  // Generate mock history data for selected sensor
  const sensorHistory = selectedSensor 
    ? generateMockSensorHistory(
        7, 
        selectedSensor.value, 
        selectedSensor.category === "water" ? 0.5 : 
        selectedSensor.category === "climate" ? 2 : 1
      )
    : [];
  
  // Handle sensor selection
  const handleSensorSelect = (sensor: SensorData) => {
    setSelectedSensor(sensor);
  };
  
  // Get proper icon for sensor
  const getSensorIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "temperature":
        return <Thermometer className="h-5 w-5" />;
      case "humidity":
      case "water ph":
      case "water temperature":
      case "nutrient level":
      case "dissolved oxygen":
        return <Droplet className="h-5 w-5" />;
      case "co2 level":
      case "airflow":
        return <Wind className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <AppHeader setShowWalletModal={setShowWalletModal} />
      <div className="pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sensor Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Real-time monitoring of all environmental sensors
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sensors</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="water">Water System</SelectItem>
                <SelectItem value="climate">Climate Control</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isDeveloperMode && (
          <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900 dark:text-amber-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-sm font-medium">Developer Mode Active</AlertTitle>
            <AlertDescription className="text-xs">
              You are viewing all sensors across all containers. In normal mode, only sensors for your container would be visible.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Readings</CardTitle>
                <CardDescription>
                  Current readings from all monitoring sensors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="grid" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="grid" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                      {filteredSensors.map(sensor => (
                        <div 
                          key={sensor.id} 
                          className={`cursor-pointer transition-transform duration-150 ${
                            selectedSensor?.id === sensor.id ? 'ring-2 ring-primary scale-[1.02]' : ''
                          }`}
                          onClick={() => handleSensorSelect(sensor)}
                        >
                          <SensorCard 
                            name={sensor.name}
                            value={sensor.value}
                            unit={sensor.unit}
                            icon={getSensorIcon(sensor.name)}
                            status={sensor.status}
                            lastUpdated={sensor.lastUpdated} // Changed from timestamp to lastUpdated to match the prop
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="list">
                    <div className="divide-y">
                      {filteredSensors.map(sensor => (
                        <div 
                          key={sensor.id}
                          className={`py-3 px-2 cursor-pointer hover:bg-muted/50 rounded-md ${
                            selectedSensor?.id === sensor.id ? 'bg-muted' : ''
                          }`}
                          onClick={() => handleSensorSelect(sensor)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                {getSensorIcon(sensor.name)}
                              </div>
                              <div>
                                <div className="font-medium">{sensor.name}</div>
                                <div className="text-sm text-muted-foreground capitalize">
                                  {sensor.category}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="font-semibold">
                                {sensor.value} {sensor.unit}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {sensor.lastUpdated}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Sensor Details</CardTitle>
                <CardDescription>
                  {selectedSensor 
                    ? `Historical data for ${selectedSensor.name}`
                    : "Select a sensor to view details"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSensor ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{selectedSensor.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedSensor.category} Sensor
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {selectedSensor.value} {selectedSensor.unit}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last updated: {selectedSensor.lastUpdated}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">7-Day History</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={sensorHistory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                          <defs>
                            <linearGradient id="sensorGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="timestamp" 
                            tick={{ fontSize: 10 }}
                            interval="preserveStartEnd"
                          />
                          <YAxis 
                            domain={[
                              (dataMin: number) => Math.floor(dataMin * 0.9),
                              (dataMax: number) => Math.ceil(dataMax * 1.1)
                            ]}
                            tick={{ fontSize: 10 }}
                          />
                          <Tooltip 
                            contentStyle={{ fontSize: '12px', borderRadius: '4px' }}
                            itemStyle={{ padding: '2px 0' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3b82f6" 
                            fillOpacity={1} 
                            fill="url(#sensorGradient)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Sensor Information</h4>
                      <div className="text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-muted-foreground">ID:</div>
                          <div>{selectedSensor.id}</div>
                          <div className="text-muted-foreground">Status:</div>
                          <div className="capitalize">{selectedSensor.status}</div>
                          <div className="text-muted-foreground">Category:</div>
                          <div className="capitalize">{selectedSensor.category}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center flex-col">
                    <Activity className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground text-center">
                      Select a sensor from the list to view detailed information and historical data
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sensors;
