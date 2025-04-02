
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Check, Download, ExternalLink, Filter, Search, Settings, Thermometer, Droplet, Wind, FlaskConical, Zap, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getMockSensorData, getMockClimateData, getMockWaterData } from "@/services/mock-data";
import { SensorCard } from "@/components/sensors/SensorCard";

const Sensors = () => {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("24h");
  
  const sensorData = getMockSensorData();
  const climateData = getMockClimateData(7);
  const waterData = getMockWaterData(7);
  
  // Filter sensors based on category and search term
  const filteredSensors = sensorData.filter(sensor => 
    (category === "all" || sensor.category === category) &&
    sensor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Count sensors by status
  const errorCount = sensorData.filter(s => s.status === 'error').length;
  const warningCount = sensorData.filter(s => s.status === 'warning').length;
  const normalCount = sensorData.filter(s => s.status === 'normal').length;
  
  // Format temperature data for chart
  const tempChartData = climateData.map(data => ({
    time: new Date(data.timestamp).toLocaleTimeString(),
    temperature: data.temperature
  })).slice(0, 24);
  
  // Get icon for sensor
  const getSensorIcon = (name: string) => {
    if (name.includes('Temperature')) return <Thermometer className="h-5 w-5" />;
    if (name.includes('Humidity') || name.includes('Water') || name.includes('Moisture')) return <Droplet className="h-5 w-5" />;
    if (name.includes('CO2') || name.includes('Air')) return <Wind className="h-5 w-5" />;
    if (name.includes('pH')) return <FlaskConical className="h-5 w-5" />;
    if (name.includes('Energy') || name.includes('Power')) return <Zap className="h-5 w-5" />;
    return <Activity className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Sensor Monitoring | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Sensor Monitoring</h1>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sensors..."
                className="pl-8 w-[200px] md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7d</SelectItem>
                <SelectItem value="30d">Last 30d</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Sensors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sensorData.length}</div>
              <p className="text-sm text-muted-foreground">
                Active monitoring across all containers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Sensors Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-600">
                  <Check className="mr-1 h-3 w-3" />
                  {normalCount} Normal
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-600">
                  <AlertTriangle className="mr-1 h-3 w-3" size={12} />
                  {warningCount} Warning
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-600">
                  <AlertTriangle className="mr-1 h-3 w-3" size={12} />
                  {errorCount} Critical
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round((normalCount / sensorData.length) * 100)}% sensors operating normally
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Last Data Update</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">2 minutes ago</div>
              <p className="text-sm text-muted-foreground">
                Data refreshes automatically every 5 minutes
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={category} onValueChange={setCategory} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Sensors</TabsTrigger>
            <TabsTrigger value="climate">Climate</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Overview</CardTitle>
                <CardDescription>All active sensor readings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredSensors.map((sensor) => (
                    <SensorCard
                      key={sensor.id}
                      name={sensor.name}
                      value={sensor.value}
                      unit={sensor.unit}
                      icon={getSensorIcon(sensor.name)}
                      status={sensor.status}
                      lastUpdated={sensor.lastUpdated}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="climate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Climate Sensors</CardTitle>
                <CardDescription>Temperature, humidity, and air quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredSensors
                    .filter(sensor => sensor.category === 'climate')
                    .map((sensor) => (
                      <SensorCard
                        key={sensor.id}
                        name={sensor.name}
                        value={sensor.value}
                        unit={sensor.unit}
                        icon={getSensorIcon(sensor.name)}
                        status={sensor.status}
                        lastUpdated={sensor.lastUpdated}
                      />
                    ))
                  }
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Temperature Trend</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tempChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[20, 30]} />
                        <Tooltip formatter={(value) => [`${value}°C`, "Temperature"]} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="#f97316" 
                          strokeWidth={2} 
                          dot={false} 
                          name="Temperature" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="water" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Water Sensors</CardTitle>
                <CardDescription>pH, nutrients, and water quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredSensors
                    .filter(sensor => sensor.category === 'water')
                    .map((sensor) => (
                      <SensorCard
                        key={sensor.id}
                        name={sensor.name}
                        value={sensor.value}
                        unit={sensor.unit}
                        icon={getSensorIcon(sensor.name)}
                        status={sensor.status}
                        lastUpdated={sensor.lastUpdated}
                      />
                    ))
                  }
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">pH Level Trend</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={waterData.map(data => ({
                          time: new Date(data.timestamp).toLocaleTimeString(),
                          ph: data.ph
                        })).slice(0, 24)}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[5, 8]} />
                        <Tooltip formatter={(value) => [`${value}`, "pH"]} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="ph" 
                          stroke="#8884d8" 
                          strokeWidth={2} 
                          dot={false} 
                          name="pH Level" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="energy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Energy Sensors</CardTitle>
                <CardDescription>Power usage and system efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredSensors
                    .filter(sensor => sensor.category === 'energy')
                    .map((sensor) => (
                      <SensorCard
                        key={sensor.id}
                        name={sensor.name}
                        value={sensor.value}
                        unit={sensor.unit}
                        icon={getSensorIcon(sensor.name)}
                        status={sensor.status}
                        lastUpdated={sensor.lastUpdated}
                      />
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="environment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Environment Sensors</CardTitle>
                <CardDescription>External conditions and soil metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredSensors
                    .filter(sensor => sensor.category === 'environment')
                    .map((sensor) => (
                      <SensorCard
                        key={sensor.id}
                        name={sensor.name}
                        value={sensor.value}
                        unit={sensor.unit}
                        icon={getSensorIcon(sensor.name)}
                        status={sensor.status}
                        lastUpdated={sensor.lastUpdated}
                      />
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sensors;
