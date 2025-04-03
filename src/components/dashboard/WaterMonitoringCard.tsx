
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WaterData } from "@/services/mockDataService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplet, ThermometerSnowflake, FlaskConical, Waves } from 'lucide-react';

interface WaterMonitoringCardProps {
  waterData: WaterData;
}

export const WaterMonitoringCard: React.FC<WaterMonitoringCardProps> = ({ waterData }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <FlaskConical className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-medium">pH Level</h3>
              </div>
              <Badge 
                variant={waterData.ph < 6.0 || waterData.ph > 7.0 ? "warning" : "outline"}
                className={waterData.ph < 6.0 || waterData.ph > 7.0 ? "bg-yellow-100 text-yellow-800" : ""}
              >
                {waterData.ph < 6.0 || waterData.ph > 7.0 ? "Attention" : "Normal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{waterData.ph}</div>
            <Progress value={(waterData.ph / 14) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Acidic</span>
              <span>Neutral</span>
              <span>Basic</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Waves className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-medium">EC</h3>
              </div>
              <Badge variant="outline">
                {waterData.ec < 1.5 ? "Low" : waterData.ec > 2.0 ? "High" : "Optimal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{waterData.ec} mS/cm</div>
            <Progress value={(waterData.ec / 3) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>1.5</span>
              <span>3.0</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Dissolved O₂</h3>
              </div>
              <Badge variant={waterData.do < 5.0 ? "destructive" : "outline"}>
                {waterData.do < 5.0 ? "Critical" : "Normal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{waterData.do} mg/L</div>
            <Progress value={(waterData.do / 10) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low</span>
              <span>Optimal</span>
              <span>High</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <ThermometerSnowflake className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Water Temp</h3>
              </div>
              <Badge variant={waterData.temperature > 26 ? "warning" : "outline"}>
                {waterData.temperature > 26 ? "Warm" : "Optimal"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{waterData.temperature}°C</div>
            <Progress value={((waterData.temperature - 15) / 15) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15°C</span>
              <span>22°C</span>
              <span>30°C</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">Water Quality Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={waterData.history}
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
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="ph" stroke="#8884d8" activeDot={{ r: 8 }} name="pH" />
                <Line yAxisId="right" type="monotone" dataKey="ec" stroke="#82ca9d" name="EC (mS/cm)" />
                <Line yAxisId="left" type="monotone" dataKey="do" stroke="#ff7300" name="DO (mg/L)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-muted-foreground text-right mt-2">
            Last updated: {waterData.lastUpdated}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
