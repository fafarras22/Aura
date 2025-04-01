
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, TrendingDown, Leaf } from 'lucide-react';

interface ProductionTrend {
  date: string;
  vegetable: number;
  fruit: number;
  herb: number;
  total: number;
}

interface ProductionTrendsChartProps {
  dailyData: ProductionTrend[];
  monthlyData: ProductionTrend[];
  containerData: {
    id: string;
    name: string;
    totalProduction: number;
    valuePercentage: number;
  }[];
}

export const ProductionTrendsChart: React.FC<ProductionTrendsChartProps> = ({
  dailyData,
  monthlyData,
  containerData
}) => {
  const [timeFrame, setTimeFrame] = useState<'daily' | 'monthly'>('daily');
  const [productType, setProductType] = useState<'all' | 'vegetable' | 'fruit' | 'herb'>('all');
  
  const data = timeFrame === 'daily' ? dailyData : monthlyData;
  
  // Format currency for tooltips
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate trend percentages
  const calculateTrend = () => {
    if (data.length < 2) return { value: 0, isPositive: true };
    
    const lastValue = data[data.length - 1][productType === 'all' ? 'total' : productType];
    const previousValue = data[data.length - 2][productType === 'all' ? 'total' : productType];
    
    if (previousValue === 0) return { value: 100, isPositive: true };
    
    const percentChange = ((lastValue - previousValue) / previousValue) * 100;
    return {
      value: Math.abs(Math.round(percentChange)),
      isPositive: percentChange >= 0
    };
  };
  
  const trend = calculateTrend();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl">Production & Sales Trends</CardTitle>
            <CardDescription>
              Track production and sales performance over time
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={productType} onValueChange={(value) => setProductType(value as any)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Product type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="vegetable">Vegetables</SelectItem>
                <SelectItem value="fruit">Fruits</SelectItem>
                <SelectItem value="herb">Herbs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={timeFrame} onValueChange={(value) => setTimeFrame(value as any)}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Trend</span>
              <div className="flex items-center mt-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span className={`text-lg font-semibold ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.value}%
                </span>
              </div>
            </div>
            
            <div className="flex gap-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                <span>Vegetables</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
                <span>Fruits</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1" />
                <span>Herbs</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                />
                <Legend />
                {(productType === 'all' || productType === 'vegetable') && (
                  <Area 
                    type="monotone" 
                    dataKey="vegetable" 
                    name="Vegetables" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                )}
                {(productType === 'all' || productType === 'fruit') && (
                  <Area 
                    type="monotone" 
                    dataKey="fruit" 
                    name="Fruits" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                  />
                )}
                {(productType === 'all' || productType === 'herb') && (
                  <Area 
                    type="monotone" 
                    dataKey="herb" 
                    name="Herbs" 
                    stackId="1"
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Tabs>
        
        <div className="pt-6">
          <h3 className="text-lg font-medium mb-4">Container Comparison</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={containerData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                />
                <Bar 
                  dataKey="totalProduction" 
                  name="Total Production Value" 
                  fill="#047857" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
