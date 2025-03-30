
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockHistoricalData = [
  { month: 'Jan', sales: 5800, revenue: 87000000 },
  { month: 'Feb', sales: 6200, revenue: 93000000 },
  { month: 'Mar', sales: 7100, revenue: 106500000 },
  { month: 'Apr', sales: 8300, revenue: 124500000 },
  { month: 'May', sales: 9100, revenue: 136500000 },
  { month: 'Jun', sales: 10500, revenue: 157500000 }
];

const mockProjectedData = [
  { month: 'Jul', sales: 11200, revenue: 168000000 },
  { month: 'Aug', sales: 12500, revenue: 187500000 },
  { month: 'Sep', sales: 13700, revenue: 205500000 },
  { month: 'Oct', sales: 14900, revenue: 223500000 },
  { month: 'Nov', sales: 15800, revenue: 237000000 },
  { month: 'Dec', sales: 16700, revenue: 250500000 }
];

const mockDistributionData = [
  { name: 'Supermarkets', value: 45 },
  { name: 'Restaurants', value: 30 },
  { name: 'Direct to Consumers', value: 15 },
  { name: 'Exports', value: 10 }
];

const mockTopProductsData = [
  { name: 'Lettuce', sales: 3200, growth: 15 },
  { name: 'Spinach', sales: 2800, growth: 8 },
  { name: 'Kale', sales: 2300, growth: 12 },
  { name: 'Herbs', sales: 1900, growth: 20 },
  { name: 'Microgreens', sales: 1200, growth: 25 }
];

export const SalesDetailsCard = () => {
  const [timeFrame, setTimeFrame] = useState('6months');
  const [viewType, setViewType] = useState('sales');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl font-bold">Sales Performance</CardTitle>
          <CardDescription>Historical sales data and future projections</CardDescription>
        </div>
        <div className="flex gap-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Sales Trends</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
            <TabsTrigger value="projections">Future Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="flex flex-wrap justify-between my-4">
              <Button 
                variant={viewType === 'sales' ? "default" : "outline"} 
                onClick={() => setViewType('sales')}
                className="flex-1 sm:flex-none"
              >
                Units Sold
              </Button>
              <Button 
                variant={viewType === 'revenue' ? "default" : "outline"} 
                onClick={() => setViewType('revenue')}
                className="flex-1 sm:flex-none"
              >
                Revenue
              </Button>
            </div>
            
            <div className="h-[400px] bg-white dark:bg-gray-800 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockHistoricalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => 
                      viewType === 'sales' 
                        ? formatNumber(value) 
                        : formatCurrency(value).slice(0, -6) + 'M'
                    } 
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      viewType === 'sales' 
                        ? formatNumber(Number(value)) + ' units' 
                        : formatCurrency(Number(value)),
                      viewType === 'sales' ? 'Sales' : 'Revenue'
                    ]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={viewType} 
                    name={viewType === 'sales' ? 'Units Sold' : 'Revenue'} 
                    stroke="#4ade80" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">47,000 units</p>
                  <Badge className="mt-2" variant="success">+23.5% YoY</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(705000000)}</p>
                  <Badge className="mt-2" variant="success">+18.2% YoY</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-2xl font-bold">{formatCurrency(210000)}</p>
                  <Badge className="mt-2" variant="default">+5.8% YoY</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold">16.7%</p>
                  <Badge className="mt-2" variant="success">+3.2% QoQ</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="h-[400px] bg-white dark:bg-gray-800 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={mockDistributionData}
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                  <Legend />
                  <Bar dataKey="value" name="Percentage" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {mockDistributionData.map((item) => (
                <Card key={item.name}>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                    <p className="text-2xl font-bold">{item.value}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="h-[400px] bg-white dark:bg-gray-800 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockTopProductsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" name="Units Sold" fill="#4ade80" />
                  <Bar yAxisId="right" dataKey="growth" name="Growth %" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {mockTopProductsData.slice(0, 3).map((product) => (
                <Card key={product.name}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(product.sales)} units
                        </p>
                      </div>
                      <Badge variant="success">+{product.growth}%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${(product.sales / 3200) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="projections">
            <div className="h-[400px] bg-white dark:bg-gray-800 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...mockHistoricalData, ...mockProjectedData]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatNumber(Number(value)), 'Units']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    data={mockHistoricalData}
                    name="Historical" 
                    stroke="#4ade80" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    data={mockProjectedData}
                    name="Projected" 
                    stroke="#f59e0b" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Projected Annual Sales</p>
                  <p className="text-2xl font-bold">132,500 units</p>
                  <Badge className="mt-2" variant="outline">+45.7% from current</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Projected Annual Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(1.9875e9)}</p>
                  <Badge className="mt-2" variant="outline">+41.2% from current</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Growth Forecast</p>
                  <p className="text-2xl font-bold">+58%</p>
                  <Badge className="mt-2" variant="success">Above Industry Avg</Badge>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 p-4 border border-dashed rounded-lg">
              <h3 className="font-medium text-lg mb-2">Upcoming Projects</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Jakarta Central Hub Expansion</p>
                    <p className="text-sm text-muted-foreground">Q3 2023 - Capacity increase by 40%</p>
                  </div>
                  <Badge variant="outline">Planning</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Surabaya Container Farm</p>
                    <p className="text-sm text-muted-foreground">Q4 2023 - New market entry</p>
                  </div>
                  <Badge variant="default">Funded</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bali Tourism Partnership</p>
                    <p className="text-sm text-muted-foreground">Q1 2024 - Hotel & restaurant direct supply</p>
                  </div>
                  <Badge variant="outline">Negotiating</Badge>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
