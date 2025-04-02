
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { SensorCard } from "@/components/sensors/SensorCard";
import { getMockWaterData, getMockSensorData } from "@/services/mock-data";
import { Droplet, FlaskConical, Waves, Thermometer } from "lucide-react";

const Water = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const waterData = getMockWaterData(7);
  const sensorData = getMockSensorData().filter(sensor => sensor.category === 'water');
  
  // Format data for charts
  const chartData = waterData.map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString(),
    ph: reading.ph,
    ec: reading.ec,
    tds: reading.tds,
    do: reading.do,
    level: reading.level,
    temperature: reading.temperature
  })).slice(0, 24);

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Water Monitoring | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Water Monitoring</h1>
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
                sensor.name === "Water pH" ? <FlaskConical className="h-5 w-5" /> :
                sensor.name === "Nutrient Level" ? <Droplet className="h-5 w-5" /> :
                sensor.name === "Water Temperature" ? <Thermometer className="h-5 w-5" /> :
                <Waves className="h-5 w-5" />
              }
              status={sensor.status}
              lastUpdated={sensor.lastUpdated}
            />
          ))}
        </div>
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>pH & EC Trends</CardTitle>
            <CardDescription>
              Water quality parameters over the past {timeRange === "24h" ? "24 hours" : 
                timeRange === "7d" ? "7 days" : 
                timeRange === "30d" ? "30 days" : "90 days"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" domain={[5, 8]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 3.5]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="ph" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="pH" 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="ec" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    name="EC (mS/cm)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Dissolved Oxygen</CardTitle>
                <CardDescription>DO levels in water</CardDescription>
              </div>
              <Badge variant={sensorData.find(s => s.name === "Dissolved Oxygen")?.status === 'error' ? 'destructive' : 'outline'}>
                {sensorData.find(s => s.name === "Dissolved Oxygen")?.status === 'error' ? 'Critical' : 'Normal'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[4, 9]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="do" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      name="DO (mg/L)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Water Level & Temperature</CardTitle>
              <CardDescription>Current conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.filter((_, i) => i % 4 === 0)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" domain={[15, 30]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="level" fill="#60a5fa" name="Water Level (%)" />
                    <Bar yAxisId="right" dataKey="temperature" fill="#f97316" name="Temperature (°C)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Water;
