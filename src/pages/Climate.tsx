import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SensorCard } from "@/components/sensors/SensorCard";
import { getMockClimateData, getMockSensorData } from "@/services/mockDataService";
import { Thermometer, Droplet, Wind, Sun } from "lucide-react";
import { SensorStatus } from "@/services/mock-data/types";

const Climate = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const climateData = getMockClimateData(7);
  
  // Format chart data
  const formattedClimateData = climateData.map(reading => ({
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
          <SensorCard 
            title="Temperature" 
            value={25.3} 
            unit="°C" 
            icon={<Thermometer className="w-5 h-5" />}
            status={"normal" as SensorStatus}
            progress={65}
            minValue={15}
            maxValue={35}
          />
          <SensorCard 
            title="Humidity" 
            value={64} 
            unit="%" 
            icon={<Droplet className="w-5 h-5" />}
            status={"normal" as SensorStatus}
            progress={64}
            minValue={0}
            maxValue={100}
          />
          <SensorCard 
            title="CO2 Level" 
            value={415} 
            unit="ppm" 
            icon={<Wind className="w-5 h-5" />}
            status={"normal" as SensorStatus}
            progress={41.5}
            minValue={0}
            maxValue={1000}
          />
          <SensorCard 
            title="Light Intensity" 
            value={850} 
            unit="lux" 
            icon={<Sun className="w-5 h-5" />}
            status={"normal" as SensorStatus}
            progress={85}
            minValue={0}
            maxValue={1000}
          />
        </div>
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Temperature Trends</CardTitle>
            <CardDescription>
              Temperature readings over the past {timeRange === "24h" ? "24 hours" : 
                timeRange === "7d" ? "7 days" : 
                timeRange === "30d" ? "30 days" : "90 days"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedClimateData}>
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
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Humidity & CO2</CardTitle>
              <CardDescription>Correlation between humidity and CO2 levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedClimateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" domain={[300, 500]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={false} 
                      name="Humidity (%)" 
                    />
                    <Line 
                      yAxisId="right"
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
          
          <Card>
            <CardHeader>
              <CardTitle>Light Intensity</CardTitle>
              <CardDescription>Light levels throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedClimateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 1000]} />
                    <Tooltip formatter={(value) => [`${value} lux`, "Light"]} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="light" 
                      stroke="#eab308" 
                      strokeWidth={2} 
                      dot={false} 
                      name="Light Intensity" 
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
