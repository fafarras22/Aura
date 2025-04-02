
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { SensorCard } from "@/components/sensors/SensorCard";
import { getMockClimateData, getMockSensorData } from "@/services/mock-data";
import { Thermometer, Droplets, Wind, Zap } from "lucide-react";

const Climate = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const climateData = getMockClimateData(7);
  const sensorData = getMockSensorData().filter(sensor => sensor.category === 'climate');
  
  // Format data for charts
  const chartData = climateData.map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString(),
    temperature: reading.temperature,
    humidity: reading.humidity,
    co2: reading.co2,
    light: reading.light
  })).slice(0, 24);

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Climate Monitoring | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Climate Monitoring</h1>
          <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensorData.map((sensor) => (
            <SensorCard
              key={sensor.id}
              name={sensor.name}
              value={sensor.value}
              unit={sensor.unit}
              icon={
                sensor.name === "Temperature" ? <Thermometer className="h-5 w-5" /> :
                sensor.name === "Humidity" ? <Droplets className="h-5 w-5" /> :
                sensor.name === "CO2 Level" ? <Wind className="h-5 w-5" /> :
                <Zap className="h-5 w-5" />
              }
              status={sensor.status}
              lastUpdated={sensor.lastUpdated}
            />
          ))}
        </div>
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Temperature Trends</CardTitle>
            <CardDescription>
              Temperature changes over the past {timeRange === "24h" ? "24 hours" : 
                timeRange === "7d" ? "7 days" : 
                timeRange === "30d" ? "30 days" : "90 days"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ff7300" 
                    fill="#ff7300" 
                    fillOpacity={0.2} 
                    name="Temperature (°C)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
              <CardDescription>Humidity levels over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[40, 90]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={false} 
                      name="Humidity (%)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>CO2 Levels</CardTitle>
              <CardDescription>Carbon dioxide concentration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[300, 1200]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="co2" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      dot={false} 
                      name="CO2 (ppm)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Climate;
