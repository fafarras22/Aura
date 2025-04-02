
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Filter } from "lucide-react";

// Mock data for vegetable production
const vegetableProduction = [
  { name: "Lettuce", current: 450, previous: 380, growth: 18.4, price: 24000 },
  { name: "Spinach", current: 320, previous: 290, growth: 10.3, price: 28000 },
  { name: "Kale", current: 260, previous: 210, growth: 23.8, price: 32000 },
  { name: "Cabbage", current: 180, previous: 220, growth: -18.2, price: 20000 },
  { name: "Arugula", current: 150, previous: 120, growth: 25.0, price: 36000 },
  { name: "Bok Choy", current: 120, previous: 100, growth: 20.0, price: 26000 },
];

// Monthly production data
const monthlyProduction = [
  { month: "Jan", lettuce: 320, spinach: 240, kale: 180 },
  { month: "Feb", lettuce: 350, spinach: 250, kale: 200 },
  { month: "Mar", lettuce: 380, spinach: 270, kale: 220 },
  { month: "Apr", lettuce: 420, spinach: 290, kale: 250 },
  { month: "May", lettuce: 450, spinach: 320, kale: 260 },
  { month: "Jun", lettuce: 480, spinach: 340, kale: 280 },
];

// Quality distribution
const qualityData = [
  { name: "Premium", value: 65 },
  { name: "Standard", value: 30 },
  { name: "Below Standard", value: 5 },
];

const COLORS = ["#4ade80", "#facc15", "#f87171"];

const Vegetables = () => {
  const [period, setPeriod] = useState("month");
  const [view, setView] = useState("overview");
  
  const totalProduction = vegetableProduction.reduce((sum, item) => sum + item.current, 0);
  const totalValue = vegetableProduction.reduce((sum, item) => sum + (item.current * item.price), 0);
  const averageGrowth = vegetableProduction.reduce((sum, item) => sum + item.growth, 0) / vegetableProduction.length;

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Vegetable Production | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Vegetable Production</h1>
          
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
              <CardTitle className="text-lg font-medium">Total Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalProduction} kg</div>
              <div className="flex items-center mt-1">
                <Badge variant={averageGrowth >= 0 ? "success" : "destructive"}>
                  {averageGrowth >= 0 ? "+" : ""}{averageGrowth.toFixed(1)}%
                </Badge>
                <span className="text-sm text-muted-foreground ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalValue)}
              </div>
              <p className="text-sm text-muted-foreground">Market value of production</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quality Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">92%</div>
              <p className="text-sm text-muted-foreground">Premium and standard grade</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={view} onValueChange={setView} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vegetable Production Comparison</CardTitle>
                <CardDescription>Current vs previous period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={vegetableProduction}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value} kg`, "Production"]} />
                      <Legend />
                      <Bar dataKey="current" name="Current Period" fill="#4ade80" />
                      <Bar dataKey="previous" name="Previous Period" fill="#94a3b8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Production Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vegetable</TableHead>
                      <TableHead className="text-right">Production (kg)</TableHead>
                      <TableHead className="text-right">Price (IDR/kg)</TableHead>
                      <TableHead className="text-right">Value (IDR)</TableHead>
                      <TableHead className="text-right">Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vegetableProduction.map((veg) => (
                      <TableRow key={veg.name}>
                        <TableCell className="font-medium">{veg.name}</TableCell>
                        <TableCell className="text-right">{veg.current}</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(veg.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(veg.current * veg.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={veg.growth >= 0 ? "text-green-600" : "text-red-600"}>
                            {veg.growth >= 0 ? "+" : ""}{veg.growth.toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Production Trends</CardTitle>
                <CardDescription>Top 3 vegetables over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyProduction}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} kg`, "Production"]} />
                      <Legend />
                      <Line type="monotone" dataKey="lettuce" name="Lettuce" stroke="#4ade80" strokeWidth={2} />
                      <Line type="monotone" dataKey="spinach" name="Spinach" stroke="#60a5fa" strokeWidth={2} />
                      <Line type="monotone" dataKey="kale" name="Kale" stroke="#f97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Rate by Vegetable</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vegetableProduction}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[-30, 30]} />
                        <Tooltip formatter={(value) => [`${value}%`, "Growth Rate"]} />
                        <Bar dataKey="growth" name="Growth Rate" fill="#4ade80">
                          {vegetableProduction.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? '#4ade80' : '#f87171'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Production vs. Value</CardTitle>
                  <CardDescription>Relative value efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={vegetableProduction}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" domain={[0, 40000]} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="current" name="Production (kg)" fill="#4ade80" />
                        <Bar yAxisId="right" dataKey="price" name="Price (IDR/kg)" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="quality" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Distribution</CardTitle>
                  <CardDescription>By grading category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={qualityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {qualityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Appearance</TableCell>
                        <TableCell>92%</TableCell>
                        <TableCell>90%</TableCell>
                        <TableCell><Badge variant="success">Above Target</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Nutrient Content</TableCell>
                        <TableCell>88%</TableCell>
                        <TableCell>85%</TableCell>
                        <TableCell><Badge variant="success">Above Target</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Shelf Life</TableCell>
                        <TableCell>94%</TableCell>
                        <TableCell>90%</TableCell>
                        <TableCell><Badge variant="success">Above Target</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Consistency</TableCell>
                        <TableCell>86%</TableCell>
                        <TableCell>90%</TableCell>
                        <TableCell><Badge variant="destructive">Below Target</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Flavor Profile</TableCell>
                        <TableCell>91%</TableCell>
                        <TableCell>90%</TableCell>
                        <TableCell><Badge variant="success">Above Target</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Quality Improvement Plan</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Address consistency issues with improved lighting cycles</li>
                      <li>• Implement new nutrient mixture for flavor enhancement</li>
                      <li>• Refine harvesting procedure to maintain quality standard</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Vegetables;
