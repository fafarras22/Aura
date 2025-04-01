
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { supabase } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";
import { format, subDays, subMonths } from "date-fns";
import { Leaf, ChartBar, TrendingUp } from "lucide-react";

// Type for container sales performance
interface ContainerSalesPerformance {
  id: string;
  name: string;
  totalSales: number;
  vegetablesSales: number;
  fruitsSales: number;
  herbsSales: number;
  growth: number;
}

// Type for product sales by category
interface ProductSales {
  id: string;
  name: string;
  category: 'vegetable' | 'fruit' | 'herb';
  sales: number;
  revenue: number;
}

// Type for daily sales data
interface DailySales {
  date: string;
  totalSales: number;
  vegetables: number;
  fruits: number;
  herbs: number;
}

const SalesAnalysis = () => {
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [productCategory, setProductCategory] = useState<'all' | 'vegetable' | 'fruit' | 'herb'>('all');
  const [containerFilter, setContainerFilter] = useState<string>("all");
  const [containers, setContainers] = useState<{id: string, name: string}[]>([]);
  
  const [containerPerformance, setContainerPerformance] = useState<ContainerSalesPerformance[]>([]);
  const [productSales, setProductSales] = useState<ProductSales[]>([]);
  const [dailySales, setDailySales] = useState<DailySales[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Load containers
  useEffect(() => {
    const fetchContainers = async () => {
      try {
        // This will fail until you create the tables
        const { data, error } = await supabase
          .from('containers')
          .select('id, name');
          
        if (error) {
          console.error("Error fetching containers:", error);
          
          // Mock data for demo
          const mockContainers = [
            { id: "cont-001", name: "Container Jakarta 01" },
            { id: "cont-002", name: "Container Bandung 01" },
            { id: "cont-003", name: "Container Surabaya 01" }
          ];
          
          setContainers(mockContainers);
          return;
        }
        
        if (data) {
          setContainers(data);
        }
      } catch (error) {
        console.error("Error in container fetch:", error);
      }
    };
    
    fetchContainers();
  }, []);
  
  // Load sales data
  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      
      try {
        // This function would fetch real data from Supabase
        // For demo purposes, we'll generate mock data
        
        // Generate mock container performance data
        const mockContainerPerformance: ContainerSalesPerformance[] = containers.map(container => ({
          id: container.id,
          name: container.name,
          totalSales: 250000 + Math.floor(Math.random() * 2000000),
          vegetablesSales: 120000 + Math.floor(Math.random() * 800000),
          fruitsSales: 80000 + Math.floor(Math.random() * 600000),
          herbsSales: 50000 + Math.floor(Math.random() * 300000),
          growth: Math.floor(Math.random() * 40) - 10, // Between -10% and +30%
        }));
        
        // Generate mock product sales
        const vegetables = ['Spinach', 'Kale', 'Lettuce', 'Bok Choy', 'Cabbage'];
        const fruits = ['Strawberry', 'Cherry Tomato', 'Bell Pepper', 'Cucumber'];
        const herbs = ['Basil', 'Mint', 'Cilantro', 'Parsley', 'Thyme'];
        
        const mockProductSales: ProductSales[] = [
          ...vegetables.map((name) => ({
            id: `v-${name.toLowerCase().replace(' ', '-')}`,
            name,
            category: 'vegetable' as const,
            sales: 200 + Math.floor(Math.random() * 800),
            revenue: 50000 + Math.floor(Math.random() * 500000)
          })),
          ...fruits.map((name) => ({
            id: `f-${name.toLowerCase().replace(' ', '-')}`,
            name,
            category: 'fruit' as const,
            sales: 100 + Math.floor(Math.random() * 500),
            revenue: 80000 + Math.floor(Math.random() * 800000)
          })),
          ...herbs.map((name) => ({
            id: `h-${name.toLowerCase().replace(' ', '-')}`,
            name,
            category: 'herb' as const,
            sales: 50 + Math.floor(Math.random() * 300),
            revenue: 30000 + Math.floor(Math.random() * 300000)
          }))
        ];
        
        // Generate daily sales data for the past 30 days
        const mockDailySales: DailySales[] = Array.from({ length: 30 }, (_, i) => {
          const date = subDays(new Date(), 29 - i);
          
          // Create a slight upward trend with some randomness
          const trendFactor = 1 + (i * 0.02); // Increases by 2% each day
          const randomFactor = 0.8 + (Math.random() * 0.4); // Random factor between 0.8 and 1.2
          
          const vegetables = 400000 * trendFactor * randomFactor;
          const fruits = 300000 * trendFactor * randomFactor;
          const herbs = 150000 * trendFactor * randomFactor;
          
          return {
            date: format(date, 'MMM dd'),
            vegetables: Math.round(vegetables),
            fruits: Math.round(fruits),
            herbs: Math.round(herbs),
            totalSales: Math.round(vegetables + fruits + herbs)
          };
        });
        
        setContainerPerformance(mockContainerPerformance);
        setProductSales(mockProductSales);
        setDailySales(mockDailySales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalesData();
  }, [containers, timeFrame, containerFilter]);
  
  // Filter the data based on selected filters
  const filteredProductSales = productSales.filter(product => 
    productCategory === 'all' || product.category === productCategory
  );
  
  // Format currency for tooltips
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Colors for pie chart
  const CATEGORY_COLORS = {
    vegetable: '#10b981',
    fruit: '#3b82f6',
    herb: '#8b5cf6'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Sales Analysis | AKAR Dashboard</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Production & Sales Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Analyze production and sales data across all containers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Sales Value</CardTitle>
              <CardDescription>Across all containers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(containerPerformance.reduce((sum, item) => sum + item.totalSales, 0))}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Last 30 days
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Best Performing Product</CardTitle>
              <CardDescription>By revenue</CardDescription>
            </CardHeader>
            <CardContent>
              {productSales.length > 0 && (
                <>
                  <div className="text-3xl font-bold">
                    {productSales.sort((a, b) => b.revenue - a.revenue)[0].name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(productSales.sort((a, b) => b.revenue - a.revenue)[0].revenue)}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Best Performing Container</CardTitle>
              <CardDescription>By sales value</CardDescription>
            </CardHeader>
            <CardContent>
              {containerPerformance.length > 0 && (
                <>
                  <div className="text-3xl font-bold">
                    {containerPerformance.sort((a, b) => b.totalSales - a.totalSales)[0].name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(containerPerformance.sort((a, b) => b.totalSales - a.totalSales)[0].totalSales)}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Daily sales performance</CardDescription>
                </div>
                
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as any)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time Frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={containerFilter} onValueChange={setContainerFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Container" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Containers</SelectItem>
                      {containers.map(container => (
                        <SelectItem key={container.id} value={container.id}>
                          {container.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dailySales}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="vegetables" 
                      name="Vegetables" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="fruits" 
                      name="Fruits" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="herbs" 
                      name="Herbs" 
                      stackId="1"
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>Sales distribution by category</CardDescription>
                </div>
                
                <Tabs defaultValue="revenue" className="w-[160px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="volume">Volume</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { 
                          name: 'Vegetables', 
                          value: containerPerformance.reduce((sum, item) => sum + item.vegetablesSales, 0),
                          category: 'vegetable'
                        },
                        { 
                          name: 'Fruits', 
                          value: containerPerformance.reduce((sum, item) => sum + item.fruitsSales, 0),
                          category: 'fruit'
                        },
                        { 
                          name: 'Herbs', 
                          value: containerPerformance.reduce((sum, item) => sum + item.herbsSales, 0),
                          category: 'herb'
                        }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { category: 'vegetable', color: CATEGORY_COLORS.vegetable },
                        { category: 'fruit', color: CATEGORY_COLORS.fruit },
                        { category: 'herb', color: CATEGORY_COLORS.herb }
                      ].map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between mt-4 text-sm">
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
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Container Performance</CardTitle>
                  <CardDescription>Comparison by sales value</CardDescription>
                </div>
                
                <Select value={productCategory} onValueChange={(value) => setProductCategory(value as any)}>
                  <SelectTrigger className="w-[150px] mt-2 sm:mt-0">
                    <SelectValue placeholder="Product Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="vegetable">Vegetables</SelectItem>
                    <SelectItem value="fruit">Fruits</SelectItem>
                    <SelectItem value="herb">Herbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={containerPerformance}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={110}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    {(productCategory === 'all' || productCategory === 'vegetable') && (
                      <Bar 
                        dataKey="vegetablesSales" 
                        name="Vegetables" 
                        fill={CATEGORY_COLORS.vegetable} 
                      />
                    )}
                    {(productCategory === 'all' || productCategory === 'fruit') && (
                      <Bar 
                        dataKey="fruitsSales" 
                        name="Fruits" 
                        fill={CATEGORY_COLORS.fruit} 
                      />
                    )}
                    {(productCategory === 'all' || productCategory === 'herb') && (
                      <Bar 
                        dataKey="herbsSales" 
                        name="Herbs" 
                        fill={CATEGORY_COLORS.herb} 
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>By revenue (IDR)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredProductSales
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 10)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Bar 
                      dataKey="revenue" 
                      name="Revenue" 
                      fill="#047857"
                    >
                      {filteredProductSales
                        .sort((a, b) => b.revenue - a.revenue)
                        .slice(0, 10)
                        .map((entry) => (
                          <Cell 
                            key={entry.id} 
                            fill={CATEGORY_COLORS[entry.category]} 
                          />
                        ))}
                    </Bar>
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

export default SalesAnalysis;
