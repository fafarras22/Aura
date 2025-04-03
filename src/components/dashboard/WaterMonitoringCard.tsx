
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplet, ThermometerSnowflake, Zap, Activity } from "lucide-react";
import { WaterData } from "@/services/mockDataService";

interface WaterMonitoringCardProps {
  waterData: WaterData;
}

export const WaterMonitoringCard: React.FC<WaterMonitoringCardProps> = ({ waterData }) => {
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
  const chartData = waterData.history.map(item => ({
    time: item.time,
    temperature: item.temperature,
    ph: item.ph,
    tds: item.tds,
    do: item.do
  }));

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Water System Status</h3>
              <Badge variant={getStatusVariant(waterData.status)} className="capitalize">
                {waterData.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">pH Level</span>
                </div>
                <div className="text-2xl font-bold">{waterData.ph}</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 5.5-6.5</div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">EC</span>
                </div>
                <div className="text-2xl font-bold">{waterData.ec} mS/cm</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 1.5-2.5</div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Dissolved O₂</span>
                </div>
                <div className="text-2xl font-bold">{waterData.do} mg/L</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 5.0-8.0</div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Temperature</span>
                </div>
                <div className="text-2xl font-bold">{waterData.temperature}°C</div>
                <div className="text-xs text-muted-foreground mt-1">Ideal: 20-25°C</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Water Parameters (24h)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ fontSize: '12px', borderRadius: '4px' }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Area type="monotone" dataKey="ph" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorPh)" />
                <Area type="monotone" dataKey="temperature" stroke="#f97316" fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
