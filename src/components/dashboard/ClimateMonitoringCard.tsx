
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ClimateData } from "@/services/mockDataService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Wind, Lightbulb } from 'lucide-react';

interface ClimateMonitoringCardProps {
  climateData: ClimateData;
}

export const ClimateMonitoringCard: React.FC<ClimateMonitoringCardProps> = ({ climateData }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Thermometer className="mr-2 h-5 w-5 text-orange-500" />
                <h3 className="font-medium">Temperature</h3>
              </div>
              <Badge 
                variant={climateData.temperature > 28 ? "warning" : "outline"}
                className={climateData.temperature > 28 ? "bg-yellow-100 text-yellow-800" : ""}
              >
                {climateData.temperature > 28 ? "High" : "Optimal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{climateData.temperature}°C</div>
            <Progress value={((climateData.temperature - 15) / 20) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15°C</span>
              <span>25°C</span>
              <span>35°C</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Droplets className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Humidity</h3>
              </div>
              <Badge variant="outline">
                {climateData.humidity < 50 ? "Low" : climateData.humidity > 75 ? "High" : "Optimal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{climateData.humidity}%</div>
            <Progress value={climateData.humidity} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Wind className="mr-2 h-5 w-5 text-green-500" />
                <h3 className="font-medium">CO₂ Level</h3>
              </div>
              <Badge variant={climateData.co2Level > 800 ? "destructive" : "outline"}>
                {climateData.co2Level > 800 ? "High" : "Normal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{climateData.co2Level} ppm</div>
            <Progress value={(climateData.co2Level / 1000) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>300</span>
              <span>600</span>
              <span>1000</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Light</h3>
              </div>
              <Badge variant={climateData.light < 10000 ? "warning" : "outline"}>
                {climateData.light < 10000 ? "Low" : "Optimal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{(climateData.light / 1000).toFixed(1)}k lux</div>
            <Progress value={(climateData.light / 20000) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5k</span>
              <span>12.5k</span>
              <span>20k</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">Climate Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={climateData.history}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff7300" activeDot={{ r: 8 }} name="Temperature (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
                <Line yAxisId="left" type="monotone" dataKey="co2Level" stroke="#8884d8" name="CO₂ (ppm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-muted-foreground text-right mt-2">
            Last updated: {climateData.lastUpdated}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
