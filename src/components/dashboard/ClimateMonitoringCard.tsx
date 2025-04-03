
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Wind, Sun } from "lucide-react";
import { ClimateData } from "@/services/mockDataService";

interface ClimateMonitoringCardProps {
  climateData: ClimateData;
}

export const ClimateMonitoringCard: React.FC<ClimateMonitoringCardProps> = ({ climateData }) => {
  // Function to get badge variant based on status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary'; // Changed from 'warning' to 'secondary' to match allowed variants
      case 'normal':
        return 'success';
      default:
        return 'outline';
    }
  };

  // Create formatted data for chart
  const chartData = climateData.history.map(item => ({
    time: item.time,
    temperature: item.temperature,
    humidity: item.humidity,
    co2: item.co2Level,
    light: item.light / 1000 // Convert to K lux for better visualization
  }));

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Climate Status</h3>
              <Badge variant={getStatusVariant(climateData.status)} className="capitalize">
                {climateData.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Temperature</span>
                </div>
                <div className="text-2xl font-bold">{climateData.temperature}°C</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 22-26°C</div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Humidity</span>
                </div>
                <div className="text-2xl font-bold">{climateData.humidity}%</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 60-70%</div>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">CO₂ Level</span>
                </div>
                <div className="text-2xl font-bold">{climateData.co2Level} ppm</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 400-600 ppm</div>
              </div>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Light Intensity</span>
                </div>
                <div className="text-2xl font-bold">{climateData.light} lux</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 10K-15K lux</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Climate Parameters (24h)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHumid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ fontSize: '12px', borderRadius: '4px' }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Area type="monotone" dataKey="temperature" stroke="#ef4444" fillOpacity={1} fill="url(#colorTemp)" />
                <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHumid)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
