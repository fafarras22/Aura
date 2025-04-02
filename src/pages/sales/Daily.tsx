
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SalesDetailsCard } from "@/components/dashboard/SalesDetailsCard";
import { getMockContainerSalesData } from "@/services/mock-data";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DailySales = () => {
  const [period, setPeriod] = useState("week");
  const salesData = getMockContainerSalesData();
  
  // Process data for charts
  const dailySalesData = [
    { day: "Mon", sales: 120, revenue: 12000000 },
    { day: "Tue", sales: 140, revenue: 14000000 },
    { day: "Wed", sales: 135, revenue: 13500000 },
    { day: "Thu", sales: 150, revenue: 15000000 },
    { day: "Fri", sales: 180, revenue: 18000000 },
    { day: "Sat", sales: 210, revenue: 21000000 },
    { day: "Sun", sales: 190, revenue: 19000000 },
  ];
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Daily Sales Analysis | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Daily Sales Analysis</h1>
          
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(dailySalesData[dailySalesData.length - 1].revenue)}
              </div>
              <div className="flex items-center mt-1">
                <Badge className="bg-green-100 text-green-800">
                  <ChevronUp className="mr-1 h-3 w-3" />
                  8.5%
                </Badge>
                <span className="text-sm text-muted-foreground ml-2">vs yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Units Sold Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {dailySalesData[dailySalesData.length - 1].sales} units
              </div>
              <div className="flex items-center mt-1">
                <Badge className="bg-green-100 text-green-800">
                  <ChevronUp className="mr-1 h-3 w-3" />
                  12.3%
                </Badge>
                <span className="text-sm text-muted-foreground ml-2">vs yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avg. Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(dailySalesData[dailySalesData.length - 1].revenue / 15)}
              </div>
              <p className="text-sm text-muted-foreground">Based on 15 orders</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Trend</CardTitle>
            <CardDescription>Sales performance over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 'auto']} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === "revenue" ? formatCurrency(Number(value)) : `${value} units`,
                      name === "revenue" ? "Revenue" : "Units Sold"
                    ]}
                  />
                  <Legend />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4ade80" 
                    fill="url(#colorRevenue)" 
                    name="Revenue" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Units Sold by Day</CardTitle>
              <CardDescription>Distribution across the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} units`, "Units Sold"]} />
                    <Legend />
                    <Bar dataKey="sales" name="Units Sold" fill="#4ade80" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales By Hour</CardTitle>
              <CardDescription>Today's hourly breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { hour: '6 AM', sales: 5 },
                      { hour: '8 AM', sales: 12 },
                      { hour: '10 AM', sales: 18 },
                      { hour: '12 PM', sales: 25 },
                      { hour: '2 PM', sales: 30 },
                      { hour: '4 PM', sales: 35 },
                      { hour: '6 PM', sales: 40 },
                      { hour: '8 PM', sales: 25 },
                      { hour: '10 PM', sales: 10 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} units`, "Units Sold"]} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      name="Units Sold" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products Today</CardTitle>
            <CardDescription>By units sold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Lettuce - Romaine", sales: 45, change: 15, value: 4500000 },
                { name: "Kale - Organic", sales: 38, change: 12, value: 3800000 },
                { name: "Spinach - Baby", sales: 32, change: -5, value: 3200000 },
                { name: "Mixed Greens", sales: 30, change: 22, value: 3000000 },
                { name: "Herbs - Basil", sales: 28, change: 8, value: 2800000 },
              ].map((product, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(product.value)}</p>
                    <div className="flex items-center justify-end">
                      {product.change >= 0 ? (
                        <Badge variant="outline" className="bg-green-50 text-green-600">
                          <ChevronUp className="mr-1 h-3 w-3" />
                          {product.change}%
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-600">
                          <ChevronDown className="mr-1 h-3 w-3" />
                          {Math.abs(product.change)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySales;
